import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";

export const protectRoute = async (req, res, next) => {
    try {
        // check if there is any token present or not
        // cookie-parser allows to access cookies from req thats why we use it "app.use(cookieParser())" in index.js
        const token = req.cookies.jwt;

        if (!token) {
            throw new apiError(400, "Unauthorized, no token provided");
        }

        // if token is present decode the token to get a user id
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new apiError(400, "Unauthorized, Invalid token");
        }

        // if the decoded token is present, check the user in the data base
        const user = await User.findById(decodedToken.userId).select(
            "-password"
        );

        if (!user) {
            throw new apiError(404, "user not found");
        }

        // now if user is found, add it to the req so we can access it later
        req.user = user;

        next()
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};
