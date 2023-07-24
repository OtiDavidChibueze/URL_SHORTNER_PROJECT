// User Service 
import UserModel from '../models/user.mjs';
import HelperFunction from '../utils/helperFunction.mjs'
import logger from '../config/logger.mjs';
import Token from '../utils/token.mjs'
import InvalidatedTokenModel from '../models/invalidToken.mjs'

class User_Service {

    /**
     * @description - this endpoint is used to register a new user
     * @param {object} data - the object data 
     * @returns - returns a json
     */
    static async signUp(data) {
        try {
            // getting the details from the data
            const { name, email, password } = data;

            //checking if the user already exists
            const userExists = await UserModel.findOne({ email });
            //if the user exists ..
            if (userExists) return {
                statusCode: 406,
                message: 'user already registered'
            }

            // hash the user password
            const hashedPassword = HelperFunction.hashPassword(password)

            // register the user and save the credentials
            const newUser = await new UserModel({
                name,
                email,
                password: hashedPassword
            }).save()

            // return a json success message 
            return {
                statusCode: 201,
                message: 'user created successfully',
                data: { registered: newUser }
            }
        } catch (error) {
            logger.error(`UserService_signUp -> Error: ${error.message}`)
        }
    }

    /**
     * @description - this endpoint is used to login a new user
     * @param {object} data - the object data 
     * @returns - returns a json
     */
    static async login(data) {
        try {
            // getting the details from the data
            const { email, password } = data;

            // checking if the user exists
            const user = await UserModel.findOne({ email });
            // if the user isn't registered or password is in correct
            if (!user) return {
                statusCode: 403,
                message: "email isn't registered"
            }

            // compare the password with the user.password
            const oldPassword = HelperFunction.comparePassword(password, user.password)
            // if the password isn't correct
            if (!oldPassword) return {
                statusCode: 403,
                message: `Incorrect Password`
            }

            // generating access token
            const accessToken = Token.generateToken(user);

            // checking if the token is invalid
            const invalidToken = await InvalidatedTokenModel.findOne({ token: accessToken });
            // if the token is invalid ...
            if (invalidToken) return {
                statusCode: 401,
                message: 'invalid token , please login'
            }


            // return a success response
            return {
                statusCode: 200,
                message: 'logged in',
                data: { user, accessToken }
            }
        } catch (err) {
            logger.error(`userService_login -> Error : ${err.message}`)
        }
    }
}

export default User_Service