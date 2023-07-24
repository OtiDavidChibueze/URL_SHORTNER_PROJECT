// Helper Function
import logger from '../config/logger.mjs';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'


class HelperFunction {

    /**
     * @description - this is used to compare passwords
     * @param {string} password - the provided password
     * @param {string} oldPassword - the password already saved in the database

     */
    static comparePassword(password, oldPassword) {
        return bcrypt.compareSync(password, oldPassword);
    }

    /**
     * @description - this is used to hash the user's passwords
     * @param {string} password - the provided password to hash
     * @memberof HelperFunction
     */
    static hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync())
    }

    static validateMongooseId(id) {
        const validId = mongoose.isValidObjectId(id);

        if (!validId) return {
            success: false,
            message: 'Invalid ID format.'
        };
    }

}
export default HelperFunction

