// Shortener Controller
import Shortener_Service from '../service/shortner.mjs';
import ResponseHelper from '../utils/responseHelper.mjs'
import logger from '../config/logger.mjs'
import Shortener_Model from '../models/shortner.mjs';

class Shortener_Controller {

    /**
     * @description - returns a json message
     * @param {object} req - the object request 
     * @param {object} res - the object response
     * @returns - returns the json object
     */
    static async shorten_url(req, res) {
        try {

            const data = req.body;

            const result = await Shortener_Service.shorten_url(data, req);

            if (result.statusCode == 409) return ResponseHelper.errorResponse(res, result.statusCode, result.message)

            logger.info(`ShortenerController_shorten_url -> Info : generated short_url : ${JSON.stringify(result.data)}`)

            return ResponseHelper.successResponse(res, result.statusCode, result.message, result.data)

        } catch (error) {
            logger.error(`ShortenerController_shorten_url -> Error : ${error.message}`);
            return ResponseHelper.errorResponse(res, result.statusCode, result.message)
        }
    }

    /**
    * @description - this is used to redirect the shortened url
    * @param {object} req - the object request 
    * @param {object} res - the object response
    * @returns - returns a success message
    */
    static async redirect_short_url(req, res) {
        try {
            // Getting the details from the data
            const { shortUrl, } = req.params;

            // getting the longUrl with the _id of the short Url
            const longUrl = await Shortener_Model.findOne({ create_your_short_url: `${req.baseUrl}/${shortUrl}` });

            // if the longUrl doesn't exists
            if (!longUrl) return ResponseHelper.errorResponse(res, 404, 'longUrl not found');

            // logging the longUrl to the console
            logger.info(`shortener_redirect_short_url -> Info: redirecting.... ${JSON.stringify(longUrl.long_url)}`);

            // redirect to the original url
            //! NB: the res.redirect() is used for redirection, so as a backed developer the redirection cant take place using postman, ill just display the original url using res.send()
            // return res.redirect(longUrl.long_url)
            return res.send(longUrl.long_url)

        } catch (err) {
            logger.error(`shortener_redirect_short_url -> Error: ${err.message}`);
            return ResponseHelper.errorResponse(res, result.statusCode, result.message)
        }
    }

    /**
    * @description - this is used to redirect the shortened url
    * @param {object} req - the object request 
    * @param {object} res - the object response
    * @returns - returns a success message
    */
    static async get_all_shortened(req, res) {
        try {

            const data = req.user;

            const result = await Shortener_Service.get_all_shortened(data);

            if (result.statusCode == 409) return ResponseHelper.errorResponse(res, result.statusCode, result.message);

            // logging the longUrl to the console
            logger.info(`shortenerController_get_all_shortened -> Info: fetched all shortened urls ${JSON.stringify(result.data)}`);

            return ResponseHelper.successResponse(res, result.statusCode, result.message, result.data)

        } catch (err) {
            logger.error(`shortenerController_get_all_shortened -> Error: ${err.message}`);
            return ResponseHelper.errorResponse(res, result.statusCode, result.message)
        }
    }

    /**
     * @description - returns a json message
     * @param {object} req - the object request 
     * @param {object} res - the object response
     * @returns - returns the json object
     */
    static async update_url(req, res) {
        try {
            const data = req.body;

            const result = await Shortener_Service.update_url(data, req);

            if (result.statusCode == 409) return ResponseHelper.errorResponse(res, result.statusCode, result.message)

            logger.info(`ShortenerController_update_url -> Info : updated successfully : ${JSON.stringify(result.data)}`)

            return ResponseHelper.successResponse(res, result.statusCode, result.message, result.data)

        } catch (error) {
            logger.error(`ShortenerController_update_url -> Error : ${error.message}`);
            return ResponseHelper.errorResponse(res, result.statusCode, result.message)
        }
    }

    /**
    * @description - returns a json message
    * @param {object} req - the object request 
    * @param {object} res - the object response
    * @returns - returns the json object
    */
    static async delete_url(req, res) {
        try {

            const data = req.params;

            const result = await Shortener_Service.delete_url(data, req);

            if (result.statusCode == 409) return ResponseHelper.errorResponse(res, result.statusCode, result.message)

            logger.info(`ShortenerController_delete_url -> Info :  ${JSON.stringify(result.message)}`)

            return ResponseHelper.successResponse(res, result.statusCode, result.message)

        } catch (error) {
            logger.error(`ShortenerController_delete_url -> Error : ${error.message}`);
            return ResponseHelper.errorResponse(res, result.statusCode, result.message)
        }
    }

    /**
  * @description - returns a json message
  * @param {object} req - the object request 
  * @param {object} res - the object response
  * @returns - returns the json object
  */
    static async get_by_id(req, res) {
        try {

            const data = req.params;

            const result = await Shortener_Service.get_by_id(data, req);

            if (result.statusCode == 409) return ResponseHelper.errorResponse(res, result.statusCode, result.message)

            logger.info(`ShortenerController_get_by_id -> Info : fetched the url :  ${JSON.stringify(result.data)}`)

            return ResponseHelper.successResponse(res, result.statusCode, result.message, result.data)

        } catch (error) {
            logger.error(`ShortenerController_get_by_id -> Error : ${error.message}`);
            return ResponseHelper.errorResponse(res, result.statusCode, result.message)
        }
    }






}

export default Shortener_Controller