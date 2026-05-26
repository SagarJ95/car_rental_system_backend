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

/********************************************************* Feture Vehicles Car ************************************************* */

//GET Feature Vehicles
const feature_vehicles = catchAsync(async (req: Request, res: Response) => {

    try {
        let getFetureVehicales = await db.query(`select id,car_name,model,main_image from tbl_cars  where feature_vehicles_status = $1 and status = $2`, [1, "1"])
        res.status(200).json({
            message: "get Feature vehicles",
            data: (getFetureVehicales.rowCount ?? 0) > 0 ? getFetureVehicales.rows : []
        })
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        })
    }
})

export {
    feature_vehicles
}