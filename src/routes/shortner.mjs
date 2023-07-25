// Shortener_Route
import { Router } from 'express';
const router = Router();
import Shortener_Controller from '../controller/shortner.mjs';
import { validUrl, updateUrl } from '../validation/schema/shortner.mjs'
import SchemaValidation from '../validation/schemaValidationHelper.mjs'
import Authorization from '../middleware/authorization.mjs'

// get
router.get('/all', Authorization, Shortener_Controller.get_all_shortened)
router.get('/:urlId', Authorization, Shortener_Controller.get_by_id)
router.get('/:shortUrl', Authorization, Shortener_Controller.redirect_short_url)

// post
router.post('/shorten', Authorization, SchemaValidation.validateSchema(validUrl), Shortener_Controller.shorten_url)

// put
router.put('/:urlId', Authorization, SchemaValidation.validateSchema(updateUrl), Shortener_Controller.update_url)

// delete
router.delete('/:urlId', Authorization, Shortener_Controller.delete_url)



export default router;


