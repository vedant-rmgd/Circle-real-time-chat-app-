import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongoDB connected successfully!!! at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`mongoDB connection error : ${error}`)
    }
};
