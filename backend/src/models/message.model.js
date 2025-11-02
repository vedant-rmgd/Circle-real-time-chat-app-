import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sendersId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reciversId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
