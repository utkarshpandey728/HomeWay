import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
// import { use } from "react";
 

const registerUser = asyncHandler( async(req,res)=>{
   // 1. get user details from the request body

   const {username, fullname, email, password }=req.body

   // console.log("Full Name: ",fullname);
   // console.log("Username: ",username);
   // console.log("Email: ",email);

   // 2. validate the user details - not empty any field

   if(
    [fullname,username,email,password].some((field)=>
    field?.trim()==="")
   ){
    throw new apiError(400,"Some Fields Are Missing: (not validate)");
   }

   // 3. check if the user already exists in the database (by email, username)

   const existedUser=await User.findOne({
    $or: [{ username },{ email }]
   })

   if(existedUser){
    throw new apiError(409,"User with username or email already exists");
   }


   // 4. check for images, check for  avatar
   
   

   const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new apiError(400,"Avatar file is required: (from avatarLocalpath)");
   }

   let coverImageLocalPath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.lenght > 0){
      coverImageLocalPath = req.files.console[0].path
   }

   // 5. upload to cloudinary , avatar checks

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new apiError(400,"Avatar file is required: (from avatar) ");
   }
   // 6. create user object -create entry in the database

   const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   // 7. remove password and refresh token from response

   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   // 8. check the user creation
   if(!createdUser){
      throw new apiError(500,"Something went wrong while registering the user: ")
   }

   // 9. return response 

   return res.status(201).json(
      new apiResponse(200,"User Registered successfully",createdUser)
   )

  
})


export {registerUser}
