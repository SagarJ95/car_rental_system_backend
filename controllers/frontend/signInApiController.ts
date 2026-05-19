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

// POST Customer login
const SignUp = catchAsync(async (req: Request, res: Response) => {

});

// POST Customer login
const Login = catchAsync(async (req: Request, res: Response) => {

});

export {
  SignUp,
  Login
};
