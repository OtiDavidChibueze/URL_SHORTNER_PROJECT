// User Routes
import { Router } from 'express';
const router = Router();
import User_Controller from '../controller/user.mjs';
import { validate } from '../validation/schema/user.mjs'
import SchemaValidation from '../validation/schemaValidationHelper.mjs'
import Authorization from '../middleware/authorization.mjs'

router.post('/signUp', SchemaValidation.validateSchema(validate), User_Controller.signUp)
router.post('/login', User_Controller.login);
router.post('/logout', Authorization, User_Controller.logOut)



export default router;


