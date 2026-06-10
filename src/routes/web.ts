import { Router } from "express";
const router = Router();
import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import * as signInApiController from '../controllers/frontend/signInApiController.js'
import * as ProfileApiController from '../controllers/frontend/ProfileApiController.js'
import { verfiyToken } from '../middlewares/jwtTokenWeb.js'
const project_name = process.env.APP_NAME;
import type { Request } from "express";
import path from 'path'
import fs from 'fs'
import * as CarsApiController from '../controllers/frontend/CarsApiController.js'
import * as BlogsApiController from '../controllers/frontend/BlogsApiController.js'

let ProfileStorage = multer.diskStorage({
    destination: function (req: Request, file, cb) {

        let uploadPath: string = ""
        if (file.fieldname === "driving_license_photo") {
            uploadPath = path.join(process.cwd(), "upload/driving_license");
        } else if (file.fieldname === "photo") {
            uploadPath = path.join(process.cwd(), "upload/profile_photo");
        } else {
            return cb(new Error("Invalid field name"), "");
        }

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const UploadProfile = multer({ storage: ProfileStorage })

/************************************ Sign up and login Section *********************************/

router.post('/v1/SignUp', signInApiController.SignUp)

router.post('/v1/login', signInApiController.Login)

/************************************* User Profile ******************************************* */

router.get('/v1/getProfile', verfiyToken, ProfileApiController.get_profile)

router.post('/v1/addUserProfile', verfiyToken, UploadProfile.fields([
    { name: "photo", maxCount: 1 },
    { name: "driving_license_photo", maxCount: 1 },
]), ProfileApiController.add_user_profile)


/***********************************cars ***************************************************** */

router.post('/v1/getFeatureVehical', CarsApiController.feature_vehicles)

router.post('/v1/getAllCarsDetails', CarsApiController.getAllCarsDetails)

router.post('/v1/getPricingList', CarsApiController.getPricingList)

/********************************************** Blogs ***************************************** */

router.post('/v1/getBlogsDetailsById/:id', BlogsApiController.getblogsdetailsBasedId)

router.post('/v1/getBlogsDetails', BlogsApiController.shows_blogs)

export default router;
