// DATABASE CONFIG
import mongoose from "mongoose";
import logger from "./logger.mjs";
import { DATABASE } from '../keys/keys.mjs'

// Connect to MongoDB Atlas using Mongoose library and return the connection object or error message if any errors occur during connect process :
const connect_to_database = () => {

    try {
        mongoose.connect(DATABASE, { useUnifiedTopology: true, useNewUrlParser: true })
        logger.info(`database connected`);
    } catch (error) {
        logger.error(`database_connection -> Error : ${error.message}`)
    }
}

export default connect_to_database;



