import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit: "16kb"
}));

// is simple and only in two line statements for urlencoded is , it is only for parsing the data from the form and it is not for parsing the data from the json. So we will be using express.json() for parsing the data from the json and express.urlencoded() for parsing the data from the form. We will be using cookie-parser library to parse the cookies from the request.


app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}))

// express.static() It is an Express middleware used to serve static files like HTML, CSS, and images from a folder. I used it to expose my frontend assets so they can be accessed directly via URL without defining routes.

app.use(express.static("public"));


// cookie-parser library is used to parse the cookies from the request. So we will be using cookie-parser library to parse the cookies from the request. We will be using express.static() to serve the static files from the public folder.
app.use(cookieParser());


// routes import

import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register
export {app};