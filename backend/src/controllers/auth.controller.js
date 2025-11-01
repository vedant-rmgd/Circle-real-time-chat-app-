import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/gen-JWT-token.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // validate all fields
        if ([fullName, email, password].some((data) => data?.trim() === "")) {
            throw new apiError(400, "all fields are required");
        }

        // check if user already exist or not
        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new apiError(400, "user with this email already exist");
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
        console.log("ERROR -> ", error);
        throw new apiError(500, "error in sigh up controller");
    }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
