import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

// Db is in another continent and we want to connect to it from our server which is in another continent. So we will be using the mongoose library to connect to our MongoDB database. We will be using the dotenv library to load our environment variables from the .env file. We will be using the DB_Name constant from the constants.js file to connect to our MongoDB database.


const connectDB=async ()=>{
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        console.log(`\n Connected to MongoDB !! Host: ${connectInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB from db.js:", error);
        process.exit(1);
    }
}
export default connectDB;
