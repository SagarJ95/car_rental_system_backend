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
        const { paginationId, limit }: { paginationId: number, limit: number } = req.body
        let getFetureVehicales = await db.query(`select 
            id,car_name,model,main_image from tbl_cars 
            where feature_vehicles_status = $1 and status = $2 and id > $3 ORDER BY id ASC Limit $4`, [1, "1", paginationId ?? 0, limit])
        res.status(200).json({
            message: "get Feature vehicles",
            count: getFetureVehicales.rowCount,
            data: (getFetureVehicales.rowCount ?? 0) > 0 ? getFetureVehicales.rows : [],
            nextPaginationId:
                getFetureVehicales.rows.length > 0
                    ? getFetureVehicales.rows[
                        getFetureVehicales.rows.length - 1
                    ].id
                    : null
        })
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        })
    }
})

const getAllCarsDetails = catchAsync(async (req: Request, res: Response) => {
    try {
        const { paginationId, limit }: { paginationId: Number, limit: Number } = req.body

        let fetchInfo = await db.query(`select tc.id,tc.car_name,tc.model,tc.main_image,
            ARRAY_AGG(tci.car_image) as car_images,
            tcp.per_day_rate as per_day_rate 
            from tbl_cars as tc 
            Join tbl_cars_image as tci ON tc.id = tci.car_id 
            JOIN tbl_cars_prices as tcp ON tc.id = tcp.car_id
            where tc.id > $1 GROUP BY tc.id,tcp.per_day_rate LIMIT $2 `, [paginationId, limit])

        res.status(200).json({
            message: "Fetch info successfully",
            count: fetchInfo.rowCount,
            data: (fetchInfo.rowCount ?? 0) ? fetchInfo.rows : [],
            nextPaginationId:
                fetchInfo.rows.length > 0
                    ? fetchInfo.rows[
                        fetchInfo.rows.length - 1
                    ].id
                    : null
        })


    } catch (err: any) {
        res.status(500).json({
            message: err.message
        })
    }
})

export {
    feature_vehicles,
    getAllCarsDetails
}