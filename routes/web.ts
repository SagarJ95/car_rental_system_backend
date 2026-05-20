import { Router } from "express";
const router = Router();
import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import * as signInApiController from '../controllers/frontend/signInApiController.js'
const project_name = process.env.APP_NAME;

/************************************ Sign up and login Section *********************************/

router.post('/v1/SignUp', signInApiController.SignUp)

export default router;
