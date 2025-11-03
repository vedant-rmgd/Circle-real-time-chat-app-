import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    // generate a jwt token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // convert 7 days in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: isProduction ? "none" : "lax",
    });

    return token;
};
