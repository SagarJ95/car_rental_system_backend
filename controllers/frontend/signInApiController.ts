// Defaults
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import db from "../../config/db.js";

import sequelize from "../../config/database.js";
// Models
import type { Request, Response } from "express";
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
import { generateToken, verfiyToken } from '../../middlewares/jwtTokenWeb.js'
const project_name = process.env.APP_NAME;
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
import Users from "../../db/models/users.js";

interface RegisterBody {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: number;
  password: string;
  confirm_password: string;
}

interface loginInterface {
  email: string,
  password: string
}

// POST Users login
const SignUp = catchAsync(async (req: Request, res: Response) => {

  await Promise.all([
    body('first_name').notEmpty().withMessage("Please fill the First Name").run(req),
    body('last_name').notEmpty().withMessage("Please fill the Last Name").run(req),
    body('email').notEmpty().withMessage("Please fill the Email").run(req),
    body('mobile_number').notEmpty().withMessage('Please Fill the Mobile Number').run(req),
    body('password').notEmpty().withMessage("Please Fill the Password").run(req),
    body('confirm_password').notEmpty().withMessage("Please Fill the confirm password").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password and Confirm Password do not match");
      }
      return true
    }).run(req)
  ])


  let errors: any = validationResult(req)
  if (!errors.isEmpty()) {
    let errorArray = errors.array()
    const error_message = errorArray[0]?.msg || "validation Error";
    throw new AppError(error_message, 200, errors);
  }

  try {

    const { first_name, last_name, email, mobile_number, password, confirm_password }: RegisterBody = req.body
    // role is 1 is User and 2 is Admin
    let checkEmailIdExits = await db.query(`select * from Users Where email=$1 and role = $2`, [email, 1])

    if (checkEmailIdExits.rows.length > 0) {
      return res.status(404).json({ message: "Email Id already Exits. Please try again..." })
    }
    let creation: any = null;
    const hashPassword: string = await bcrypt.hash(password, 10);

    creation = await Users.create({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      mobile_number: mobile_number,
      role: 1,
      status: "1",
      password: hashPassword,
    });

    if (creation) {
      const token = generateToken({
        id: creation.id,
      });

      //Log the user's login info
      await sequelize.query(
        `INSERT INTO users_logs (user_id, login_in, token, created_at) VALUES (:user_id, :login_in, :token,:created_at)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            user_id: creation.id,
            login_in: new Date(),
            token: token,
            created_at: new Date()
          },
        }
      );

      return res.status(200).json({
        status: true,
        message: "login successfully",
        data: [
          {
            token: token,
            name: `${first_name} ${last_name}`,
            user_id: creation ? creation?.id : "",
          },
        ],
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Account Not created successfully",
      });
    }

  } catch (err: any) {
    res.status(500).json({
      message: err.message
    })
  }
});

// POST Users login
const Login = catchAsync(async (req: Request, res: Response) => {
  await Promise.all([
    body('email').notEmpty().withMessage("Please Fill the Email").run(req),
    body('password').notEmpty().withMessage("Please Fill the Password").run(req)
  ])

  const errors: any = validationResult(req)
  if (!errors.isEmpty()) {
    let errorArray = errors.array()
    const error_message = errorArray[0]?.msg || "validation Error";
    throw new AppError(error_message, 200, errors);
  }
  try {
    const { email, password }: loginInterface = req.body

    let checkEmailExits: any = await db.query(`Select * from users where email = $1`, [email])

    if (checkEmailExits.rows.length == 0) {
      throw new Error("Email id doesn't Exits")
    }

    let comparePassword = bcrypt.compare(checkEmailExits.rows.password, password)

    if (!comparePassword) {
      throw new Error("Provide correct password")
    }

    const token = generateToken({
      id: checkEmailExits.rows.id,
    });

    res.status(200).json({
      message: "Login User SuccessFully",
      data: [{
        token: token
      }]
    })


  } catch (err: any) {
    res.status(500).json({
      message: err.message
    })
  }
});

/********************************************************* User Profile ************************************************* */

//GET User Profile
const get_profile = catchAsync(async (req: Request, res: Response) => {

  try {

    const userId: number = (req as any).user?.id;

    let getUserProfile = await db.query(`select * from users as u join tbl_users_profile as 
                                      tup ON u.id = tup.user_id where tup.user_id = $1 and u.status = $2`, [userId, "1"])


    res.status(200).json({
      message: "get Users Profiles",
      data: (getUserProfile.rowCount ?? 0) > 0 ? getUserProfile.rows : []
    })
  } catch (err: any) {
    res.status(500).json({
      message: err.message
    })
  }
})

//Add User Profile
const add_user_profile = catchAsync(async (req: Request, res: Response) => {

})

export {
  SignUp,
  Login,
  get_profile,
  add_user_profile
};
