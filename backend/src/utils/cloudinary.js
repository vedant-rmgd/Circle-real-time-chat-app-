import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs"

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null;

        const response = await cloudinary.uploader.upload(localFilepath, {
            resource_type: "auto",
        });

        console.log("file is successfully upload on cloudinary", response.url);

        fs.unlinkSync(localFilepath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilepath); //removes the locally saved temp files as the upload operation failed
        return null;
    }
};

export { uploadOnCloudinary };
