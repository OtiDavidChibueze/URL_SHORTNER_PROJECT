import jwt from 'jsonwebtoken';
import logger from '../config/logger.mjs'
import { SECRET } from '../keys/keys.mjs'

class Token {

    static generateToken(user) {

        const payload = {
            userId: user.id
        }

        const options = {
            expiresIn: "1d" // 1 hour expiration time for token
        }

        try {
            const token = jwt.sign(payload, SECRET, options);
            return token
        } catch (err) {
            logger.error(`Token_generateToken -> Error : ${err.message}`)
        }

    }

}

export default Token