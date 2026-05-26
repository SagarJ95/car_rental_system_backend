// Defaults
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import db from "../../config/db.js";
import sequelize from "../../config/database.js";
import { body, validationResult } from "express-validator";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import moment from "moment";
import pkg from "jsonwebtoken";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";
import { generateToken, verfiyToken } from '../../middlewares/jwtTokenWeb.js';
const project_name = process.env.APP_NAME;
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
import Users from "../../db/models/users.js";
/********************************************************* User Profile ************************************************* */
//GET User Profile
const get_profile = catchAsync(async (req, res) => {
    try {
        const userId = req.user?.id;
        let getUserProfile = await db.query(`select * from users as u join tbl_users_profile as 
                                      tup ON u.id = tup.user_id where tup.user_id = $1 and u.status = $2`, [userId, "1"]);
        res.status(200).json({
            message: "get Users Profiles",
            data: (getUserProfile.rowCount ?? 0) > 0 ? getUserProfile.rows : []
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
//Add User Profile
const add_user_profile = catchAsync(async (req, res) => {
    await Promise.all([
        body('first_name').notEmpty().withMessage("Please Enter the First Name").run(req),
        body("last_name").notEmpty().withMessage("Please Enter the Last Name").run(req),
        body('mobile_number').notEmpty().withMessage("Please Enter the Mobile Number").run(req),
        body('date_of_birth').notEmpty().withMessage("Please Enter date of birth").run(req),
        body('gender').notEmpty().withMessage("Please Select the gender").run(req),
        body('city').notEmpty().withMessage("Please Enter the city").run(req),
        body('state').notEmpty().withMessage("Please Enter the State").run(req),
        body('pincode').notEmpty().withMessage("Please Enter the Pincode").run(req),
        body('address_1').notEmpty().withMessage('Please Enter the Address').run(req),
        body('driving_license').notEmpty().withMessage("Please Enter the driving license").run(req),
        body('aadhar_card').notEmpty().withMessage("Please Enter the Aadhar Card No").run(req),
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorArray = errors.array();
        const error_message = errorArray[0]?.msg || "validation Error";
        throw new AppError(error_message, 200, errors);
    }
    try {
        const user_id = req.user?.id;
        const files = req.files;
        if (!files?.photo?.length) {
            throw new AppError("Please upload profile photo", 400);
        }
        if (!files?.driving_license_photo?.length) {
            throw new AppError("Please upload driving license photo", 400);
        }
        const { first_name, last_name, mobile_number, date_of_birth, gender, city, state, pincode, address_1, address_2, driving_license, aadhar_card } = req.body;
        const photoFile = files?.photo?.[0];
        const licenseFile = files?.driving_license_photo?.[0];
        const photoPath = photoFile?.path;
        const licensePath = licenseFile?.path;
        //update the user profile info
        let Info;
        let checkUserInsert = await db.query(`select * from tbl_users_profile where user_id = $1`, [user_id]);
        if (checkUserInsert.rowCount ?? 0) {
            Info = await db.query(`Update  tbl_users_profile SET mobile_number=$1,date_of_birth=$2,gender=$3,city=$4,state=$5,pincode=$6,address_1=$7,address_2=$8,driving_license=$9,aadhar_card=$10,photo=$11,driving_license_photo=$12,updated_by=$13,updated_at=$14 Where user_id = $15`, [mobile_number, date_of_birth, gender, city, state, pincode, address_1, address_2, driving_license, aadhar_card, photoPath, licensePath, user_id, new Date(), user_id]);
        }
        else {
            Info = await db.query(`Insert Into tbl_users_profile(user_id,date_of_birth,gender,photo,city,state,pincode,address_1,address_2,driving_license,aadhar_card,mobile_number,driving_license_photo,status,created_by,created_at,updated_at) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`, [user_id, date_of_birth, gender, photoPath, city, state, pincode, address_1, address_2, driving_license, aadhar_card, mobile_number, licensePath, 1, user_id, new Date(), new Date()]);
        }
        //update Users table
        await db.query("Update users SET first_name=$1,last_name=$2 Where id=$3", [first_name, last_name, user_id]);
        res.status(200).json({
            message: (Info.rowCount ?? 0) ? "Update profile details successfully" : "Update Profile details Unsuccessfully",
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
export { get_profile, add_user_profile };
//# sourceMappingURL=ProfileApiController.js.map