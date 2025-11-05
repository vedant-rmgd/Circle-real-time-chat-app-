import { Message } from "../models/message.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    const loggedInUserId = req.user._id;
    try {
        // it gives all users except the user him self
        const filteredUser = await User.find({
            _id: {
                $ne: loggedInUserId, // $ne means not equal
            },
        });

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    filteredUser,
                    "all logged in users are featched successfully"
                )
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const getMessages = async (req, res) => {
    const { id: userToChatId } = req.params; // userToChatId means the one with whome we are chatting
    const myId = req.user._id;
    try {
        const messages = await Message.find({
            $or: [
                { sendersId: myId, reciversId: userToChatId },
                { sendersId: userToChatId, reciversId: myId },
            ],
        });

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    messages,
                    "messages are featched successfully"
                )
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const sendMessage = async (req, res) => {
    const { text } = req.body;
    const { id: reciversId } = req.params;
    const sendersId = req.user._id;

    let imageUrl;
    try {
        const imageLocalPath = req.file?.path;

        if (!(text || imageLocalPath)) {
            throw new apiError(400, "text or image is required");
        }

        if (imageLocalPath) {
            const responseFromCloudinary = await uploadOnCloudinary(
                imageLocalPath
            );
            imageUrl = responseFromCloudinary.secure_url;
        }

        const message = await Message.create({
            sendersId,
            reciversId,
            text,
            image: imageUrl,
        });

        await message.save();

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    message,
                    "message has been successfully send"
                )
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            throw new apiError(400, "Message not found");
        }

        // Only the sender can delete their message
        if (message.sendersId.toString() !== req.user._id.toString()) {
            throw new apiError(400, "Not Authorized");
        }

        await message.deleteOne();

        return res
            .status(200)
            .json(new apiResponse(200, "message is deleted successfully"));

    } catch (error) {
        console.log("Error deleting message:", error);
        throw new apiError(500, error?.message)
    }
};
