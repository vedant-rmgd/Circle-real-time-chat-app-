import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/gen-JWT-token.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    // validate all fields
    try {
        if ([fullName, email, password].some((data) => data?.trim() === "")) {
            throw new apiError(400, "All fields are required");
        }

        if (password.length < 6) {
            throw new apiError(400, "Password must be atleast 6 characters");
        }

        // check if user already exist or not
        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new apiError(400, "User with this email already exist");
        }

        // now hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // now register the user in our database
        const newUser = await User.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });

        if (newUser) {
            // generate JWT token
            generateToken(newUser._id, res);
            await newUser.save();

            return res
                .status(200)
                .json(
                    new apiResponse(
                        200,
                        newUser,
                        "user is successfully signed in"
                    )
                );
        } else {
            throw new apiError(400, "problem in registering the user");
        }
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log("email and password", email, password);

    try {
        if (!(email && password)) {
            throw new apiError(400, "email and passwors both are required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new apiError(404, "invalid credentials");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password); // returns boolean

        if (!isPasswordCorrect) {
            throw new apiError(404, "invalid credentials");
        }

        generateToken(user._id, res);

        return res
            .status(200)
            .json(new apiResponse(200, user, "user is successfully logged in"));
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res
            .status(200)
            .json(new apiResponse(200, "user logged out successfully"));
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const updateProfile = async (req, res) => {
    const profilePicLocalPath = req.file?.path;
    const userId = req.user._id;

    try {
        if (!profilePicLocalPath) {
            throw new apiError(404, "profil pic local path not found");
        }

        const uploadResponse = await uploadOnCloudinary(profilePicLocalPath)

        if (!uploadResponse) {
            throw new apiError(404, "Didn't got response from cloudinary");
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilePic: uploadResponse.secure_url,
            },
            {
                new: true,
            }
        );

        if (!updatedUser) {
            throw new apiError(404, "User with updated profile pic not found!");
        }

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    updatedUser,
                    "user profile pic is successfully updated"
                )
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};
