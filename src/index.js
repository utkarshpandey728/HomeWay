// require('dotenv').config({path: './.env'});
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
    path: "./.env"
})





connectDB();
















/*In this file we will be connecting to our MongoDB database and starting our server. We will be using the mongoose library to connect to our MongoDB database and express library to start our server. We will be using the dotenv library to load our environment variables from the .env file. We will be using the DB_Name constant from the constants.js file to connect to our MongoDB database. We will be using the PORT environment variable to start our server.
import express from "express";
const app = express();

( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        console.log("Connected to MongoDB successfully!");

        app.on("error", (error)=>{
            console.error("Error starting the server:", error);
            throw error;
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
})();
*/