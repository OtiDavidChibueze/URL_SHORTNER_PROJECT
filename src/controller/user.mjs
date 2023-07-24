// User Controller 
import User_Service from '../service/user.mjs';
import logger from '../config/logger.mjs';
import ResponseHelper from '../utils/responseHelper.mjs'
import InvalidatedTokenModel from '../models/invalidToken.mjs'

class User_Controller {

    /**
     * @description - returns a json message
     * @param {object} req - the object request 
     * @param {object} res - the object response
     * @returns - returns the json object
     */
    static async signUp(req, res) {

        try {
            const data = req.body;

            const result = await User_Service.signUp(data);

            if (result.statusCode == 409) return ResponseHelper.errorResponse(res, result.statusCode, result.message);

            logger.info(`UserController_signUp -> Info : user created successfully : ${JSON.stringify(result.data)}`);

            return ResponseHelper.successResponse(res, result.statusCode, result.message, result.data)
        } catch (err) {
            logger.info(`UserController_signUp -> Error: ${err.message}`);
            return ResponseHelper.errorResponse(res, 500, 'Oops something went wrong!')
        }
    }

    /**
     * @description - returns a json message
     * @param {object} req - the object request 
     * @param {object} res - the object response
     * @returns - returns the json object
     */
    static async login(req, res) {
        try {

            const data = req.body;

            const result = await User_Service.login(data);

            if (result.statusCode == 409) return ResponseHelper.errorResponse(res, result.statusCode, result.message)

            logger.info(`ShortenerController_login -> Info : logged in successfully : ${JSON.stringify(result.data)}`)

            return ResponseHelper.successResponse(res, result.statusCode, result.message, result.data)

        } catch (error) {
            logger.error(`ShortenerController_login -> Error : ${error.message}`);
            return ResponseHelper.errorResponse(res, 500, 'Oops something went wrong!')
        }
    }

    static async logOut(req, res) {
        try {
            // fetching the authorization from the header ...
            const authHeader = req.headers.authorization;

            // extracting only the token..
            const userToken = authHeader.split(' ')[1];

            // checking if the token is already invalidated..
            const invalidToken = await InvalidatedTokenModel.findOne({ token: userToken });
            if (invalidToken) return ResponseHelper.errorResponse(res, 401, 'token already invalidated')


            // if the token isn't save the token and restrict users from using the token else where
            if (!invalidToken) {
                await InvalidatedTokenModel.create({ token: userToken })
                return ResponseHelper.successResponse(res, 200, 'logging out successfully')
            }

        } catch (err) {
            logger.error(`userController_logOut -> Error : ${err.message}`)
        }
    }

}

export default User_Controller