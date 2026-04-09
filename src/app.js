import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();


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

// express.static() we use to serve the static files from the public folder. So we will be using express.static() to serve the static files from the public folder. We will be using cookie-parser library to parse the cookies from the request.

app.use(express.static("public"));


// cookie-parser library is used to parse the cookies from the request. So we will be using cookie-parser library to parse the cookies from the request. We will be using express.static() to serve the static files from the public folder.
app.use(cookieParser());

export {app};