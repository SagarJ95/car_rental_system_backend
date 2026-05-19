import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

// Defaults
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import db from "../../config/db.js";
import type { Request, Response } from 'express';
// import { generateToken } from "../../helpers/jwt_helper.js";
// Models
import sequelize from "../../config/database.js";
// Node Modules
import { body, validationResult } from "express-validator";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { compare } from "bcrypt";
import os from "os";
const BASE_URL = process.env.BASE_URL || 'http://localhost:3847';


// POST user login
const userLogin = catchAsync(async (req: Request, res: Response) => {

});

// GET user logout
const userLogout = catchAsync(async (req: Request, res: Response, next: any) => {

});

/* Auth API End ------------------------------------- */

export {
    /* Auth API */
    userLogin,
    userLogout,
};
