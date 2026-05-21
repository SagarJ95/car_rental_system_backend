import { Router } from "express";
const router = Router();
import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import * as signInApiController from '../controllers/frontend/signInApiController.js'
import { verfiyToken } from '../middlewares/jwtTokenWeb.js'
const project_name = process.env.APP_NAME;

/************************************ Sign up and login Section *********************************/

router.post('/v1/SignUp', signInApiController.SignUp)

router.post('/v1/login', signInApiController.Login)

/************************************* User Profile ******************************************* */

router.get('/v1/getProfile', verfiyToken, signInApiController.get_profile)

router.post('/v1/addUserProfile', verfiyToken, signInApiController.add_user_profile)

export default router;
