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

// POST Users login
const SignUp = catchAsync(async (req: Request, res: Response) => {
  await Promise.all([
    body('full_name').notEmpty().withMessage("Please fill the Full Name").run(req),
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
      status: "1",
      password: hashPassword,
    });

    if (creation) {
      // const token = generateToken({
      //   id: creation.id,
      // });

      //Log the user's login info
      await sequelize.query(
        `INSERT INTO customer_logs (customer_id, login_time, token, created_at, updated_at) VALUES (:customerId, :loginIn, :token,:created_at,:updated_at)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            customerId: creation.id,
            loginIn: new Date(),
            // token: token,
            created_at: new Date(),
            updated_at: new Date(),
          },
        }
      );

      return res.status(200).json({
        status: true,
        message: "login successfully",
        data: [
          {
            // token: token,
            name: `${first_name} ${last_name}`,
            customer_id: creation ? creation?.id : "",
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




// POST Customer login
const Login = catchAsync(async (req: Request, res: Response) => {

});

export {
  SignUp,
  Login
};
