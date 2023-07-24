// url shortener authorization
import jwt from 'jsonwebtoken';
import logger from '../config/logger.mjs';
import { SECRET } from '../keys/keys.mjs'
import ResponseHelper from '../utils/responseHelper.mjs'
import InvalidatedTokenModel from '../models/invalidToken.mjs'

const Authorization = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            logger.error(res, 404, 'no token found');
            return ResponseHelper.errorResponse(res, 301, 'please login')
        }

        const token = authHeader.split(' ')[1];

        const invalidToken = await InvalidatedTokenModel.findOne({ token: token });

        if (invalidToken) return ResponseHelper.errorResponse(res, 401, 'invalid Token , please login')


        if (token) {
            jwt.verify(token, SECRET, { algorithms: ['HS256'] }, async (err, decodedToken) => {
                if (err) {
                    logger.error(err);
                    if (err.name === 'TokenExpiredError') {
                        logger.error(`Authorization -> Error : Token expired`)
                        return ResponseHelper.errorResponse(res, 301, 'please login');
                    } else {
                        logger.error(`Authorization -> Error :  ${err.message}`)
                        return ResponseHelper.errorResponse(res, 403, 'invalid token');
                    }
                } else {
                    console.log({ decodedToken: decodedToken });

                    req.user = {
                        _id: decodedToken.userId,
                    }
                    return next()

                }
            })
        }

    } catch (err) {
        logger.error(`Authorization -> Error : ${err.message}`);
        return ResponseHelper.errorResponse(res, 500, 'Oops something went wrong!')
    }
}


export default Authorization
