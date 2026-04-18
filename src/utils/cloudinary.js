// cloudinary is a cloud based media management service that allows us to upload, store, manipulate and deliver images and videos. It provides a simple and efficient way to handle media files in our application without worrying about storage and bandwidth issues. We can easily integrate cloudinary with our application using their API and SDKs.

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        // upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // file has been uploded successfully 
        //console.log("file has been uploaded", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // delete the file from local storage if there is an error
        return null;
    }
}

export {uploadOnCloudinary}