// Shortener_Service
import Shortener_Model from '../models/shortner.mjs';
import logger from '../config/logger.mjs';
import HelperFunction from '../utils/helperFunction.mjs'
import UserModel from '../models/user.mjs';

class Shortener_Service {
    /**
     * @description - this endpoint is used to save a url
     * @param {object} - the object data
     * @return - returns a json
     * @memberof Shortener_Service
     */
    static async shorten_url(data, req) {
        try {
            // getting the details from the data
            const { userId, long_url, create_your_short_url } = data;

            // fetching the logged  in user's id
            const { _id } = req.user

            // checking if its a valid mongoose id
            HelperFunction.validateMongooseId(_id);

            // fetching the currentUser with the provided _id
            const currentUser = await UserModel.findById(_id);

            // if the longUrl alreadyExists ..
            const longUrl = await Shortener_Model.findOne({ long_url: long_url });
            if (longUrl) return {
                statusCode: 200,
                message: 'you already shortened this long url',
            }

            // creating a shortUrl using the baseUrl and whatever the user would want to use as  the shortener
            const shortUrl = `${req.baseUrl}/${create_your_short_url}.com`

            // creating and save the url
            const createUrl = await new Shortener_Model({
                userId: currentUser._id,
                long_url,
                create_your_short_url: shortUrl,
            }).save();

            // return a success response
            return {
                statusCode: 200,
                message: 'generated a short url',
                data: { short_url: createUrl.create_your_short_url }
            }
        } catch (error) {
            logger.error(`ShortenerService_shorten_url -> Error : ${error.message}`);
        }
    }

    /**
    * @description - this endpoint is used to get all currentUser shortened url
    * @param {object} - the object data
    * @return - returns a json
    * @memberof Shortener_Service
    */
    static async get_all_shortened(data) {
        // getting the logged in user _id
        const { _id } = data;

        // checking if its a valid mongoose id
        HelperFunction.validateMongooseId(_id)

        // fetching all urls shortened by the currentUser
        const currentUserShortenedUrls = await Shortener_Model.find({ userId: _id })

        // getting the shortened urls counts
        const counts = currentUserShortenedUrls.length

        // if the current user doesn't have any shortened urls...
        if (currentUserShortenedUrls.length === 0) return {
            statusCode: 404,
            message: 'sorry no URLs found for this account',
            data: { urls: [], counts: 0 }
        }

        // return a  success response
        return {
            statusCode: 200,
            message: 'fetched all shortened urls',
            data: { shortened_urls: currentUserShortenedUrls, counts }
        }
    }

}

export default Shortener_Service
