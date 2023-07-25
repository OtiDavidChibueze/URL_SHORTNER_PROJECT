// Shortener_Service
import Shortener_Model from '../models/shortner.mjs';
import logger from '../config/logger.mjs';
import HelperFunction from '../utils/helperFunction.mjs'
import UserModel from '../models/user.mjs';

class Shortener_Service {
    /**
     * @description - this endpoint is used to save a url
     * @param {object} data - the object data
     * @param {object} req - the object request
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
            const shortUrl = `${req.baseUrl}/${create_your_short_url}`

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
            return {
                statusCode: 500,
                message: 'Internal server error',
            };
        }
    }

    /**
    * @description - this endpoint is used to get all currentUser shortened url
    * @param {object} data - the object data
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

    /**
    * @description - this endpoint is used update shortened url
    * @param {object} data - the object data
    * @param {object} req - the object request
    * @return - returns a json
    * @memberof Shortener_Service
    */
    static async update_url(data, req) {
        try {

            // fetching the details from the data
            const { long_url, update_your_short_url } = data

            // fetching the provided  urlId
            const { urlId } = req.params;

            // Checking if it's a valid mongoose id
            HelperFunction.validateMongooseId(urlId);

            // Fetching the long Url with the provided Url Id
            const longUrl = await Shortener_Model.findById(urlId);

            // If the longUrl doesn't exist
            if (!longUrl) {
                return {
                    statusCode: 404,
                    message: "Sorry, can't find the URL with the provided ID"
                };
            }

            // fetching the currentUser Id of the URL creator 
            const { _id } = req.user;

            // Checking if the userId of the request matches the userId of the URL creator
            if (longUrl.userId !== _id) {
                return {
                    statusCode: 403,
                    message: "You are not authorized to update this URL."
                };
            }

            // If the userId matches, proceed with updating the URL
            const update = await Shortener_Model.findByIdAndUpdate(urlId, { long_url, create_your_short_url: update_your_short_url }, { new: true });
            // save the changes
            await update.save();

            // return a success Response
            return {
                statusCode: 200,
                message: 'updated successfully',
            };
        } catch (err) {
            logger.error(`ShortenerService_update_url -> Error: ${err.message}`);
            return {
                statusCode: 500,
                message: 'Internal server error',
            };
        }
    }


    /**
   * @description - this endpoint is used update shortened url
   * @param {object} data - the object data
   * @param {object} req - the object request
   * @return - returns a json
   * @memberof Shortener_Service
   */
    static async delete_url(data, req) {
        try {

            // getting the provided urlId from the data
            const { urlId } = data;

            // Checking if it's a valid mongoose id
            HelperFunction.validateMongooseId(urlId);

            // Fetching the long Url with the provided Url Id
            const longUrl = await Shortener_Model.findById(urlId);

            // If the longUrl doesn't exist
            if (!longUrl) {
                return {
                    statusCode: 404,
                    message: "Sorry, can't find the URL with the provided ID"
                };
            }

            // fetching the currentUser Id of the URL creator 
            const { _id } = req.user;

            // Checking if the userId of the request matches the userId of the URL creator
            if (longUrl.userId !== _id) {
                return {
                    statusCode: 403,
                    message: "You are not authorized to delete this URL."
                };
            }

            // If the userId matches, proceed with deleting the URL
            await Shortener_Model.findByIdAndDelete(urlId);

            // return a success Response
            return {
                statusCode: 200,
                message: 'deleted successfully',
            };
        } catch (err) {
            logger.error(`ShortenerService_delete_url -> Error: ${err.message}`);
            return {
                statusCode: 500,
                message: 'Internal server error',
            };
        }
    }


    /**
   * @description - this endpoint is used get a shortened url by its id
   * @param {object} data - the object data
   * @param {object} req - the object request
   * @return - returns a json
   * @memberof Shortener_Service
   */
    static async get_by_id(data, req) {
        try {
            // getting the provided id from the data
            const { urlId } = data;

            // fetching the url wit the provided id
            const longUrl = await Shortener_Model.findById(urlId);
            // if the url doesn't exist 
            if (!longUrl) return {
                statusCode: 404,
                message: 'sorry no url found with the provided id'
            }

            // fetching  the current User
            const { _id } = req.user;

            // checking if its a valid mongoose Id
            HelperFunction.validateMongooseId(_id);

            // checking if the url creator is the rightful owner of the url
            if (longUrl.userId !== _id) return {
                statusCode: 403,
                message: 'You are only allowed to get your own shortened url'
            }

            // return a success Response
            return {
                statusCode: 200,
                message: 'shortened url found',
                data: { found: longUrl }
            }
        } catch (err) {
            logger.error(`shortenerService_get_by_id -> Error : ${err.message}`);
            return {
                statusCode: 500,
                message: 'internal server error'
            }
        }
    }


}

export default Shortener_Service
