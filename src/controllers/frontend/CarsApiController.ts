// Defaults
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import db from "../../config/db.js";

import sequelize from "../../config/database.js";
// Models
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

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

const getCarDetailsById = catchAsync(async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(404).json({
                message: "Id is Not Found"
            })
        }

        const fetchCardetails = await db.query(`SELECT
                    tc.id AS car_id,
                    tc.brand_id,
                    tb.brand_name,
                    tc.car_name,
                    tc.mileage,

                    CASE
                        WHEN tc.transmission = '0' THEN 'Manual'
                        ELSE 'Automatic'
                    END AS transmission,

                    tc.seats,
                    tc.luggage,

                    CASE
                        WHEN tc.fuel = '0' THEN 'Petrol'
                        ELSE 'Diesel'
                    END AS fuel,

                    tc.description,

                    COALESCE(features.feature_list, '[]') AS features,
                    COALESCE(reviews.review_list, '[]') AS reviews

                FROM tbl_cars tc
                JOIN tbl_brand tb ON tc.brand_id = tb.id


                LEFT JOIN (
                    SELECT
                        tcp.car_id,
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'feature_name', tf.feature_name,
                                'feature_status', tcp.feature_status
                            )
                        ) AS feature_list
                    FROM tbl_car_feature tcp
                    JOIN tbl_feature tf ON tf.id = tcp.feature_id
                    GROUP BY tcp.car_id
                ) features ON features.car_id = tc.id

                LEFT JOIN (
                    SELECT
                        tcr.car_id,
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'user_name', CONCAT(u.first_name, ' ', u.last_name),
                                'rating', tcr.rating,
                                'review', tcr.review
                            )
                        ) AS review_list
                    FROM tbl_cars_review tcr
                    JOIN users u ON u.id = tcr.created_by
                    GROUP BY tcr.car_id
                ) reviews ON reviews.car_id = tc.id


                WHERE tc.id = $1;`, [id])

        const related_car = await db.query(`select
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'car_id',tc.id,
                        'car_name',tc.car_name,
                        'brand_name',tb.brand_name,
                        'image',tc.main_image,
                        'price',tcp.per_day_rate
                    )
                ) as related_Car
                from (
                    SELECT tc.*
                    FROM tbl_cars tc
                    WHERE tc.brand_id = $1
                    ORDER BY tc.id DESC
                    LIMIT 3
                ) tc
                LEFT JOIN tbl_brand tb ON tc.brand_id = tb.id
                LEFT JOIN tbl_cars_prices tcp ON tc.id = tcp.car_id  `, [fetchCardetails.rows[0].brand_id])

        res.status(200).json({
            message: "Fetch Car Details successfully",
            data: [{ 'car_Details': (fetchCardetails.rowCount ?? 0) ? fetchCardetails.rows : [], 'related_car': (related_car.rowCount ?? 0) ? related_car.rows : [] }]
        })
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        })
    }
})

const getPricingList = catchAsync(async (req: Request, res: Response) => {
    try {
        let { paginationId, limit }: { paginationId: number, limit: number } = req.body
        let getAllActiveCar = await db.query(`select tc.id,tc.car_name,tc.main_image,tcp.per_hours_rate,tcp.per_day_rate,tcp.leasing,
            ROUND(AVG(tcr.rating), 1) AS avg_rating from tbl_cars as tc 
            JOIN tbl_cars_prices as tcp ON tc.id=tcp.car_id
            JOIN tbl_cars_review as tcr ON tc.id = tcr.car_id
            Where tc.id>$1 and tc.status= $2  GROUP BY tc.id,
                    tc.car_name,
                    tc.main_image,
                    tcp.per_hours_rate,
                    tcp.per_day_rate,
                    tcp.leasing order by tc.id  limit $3 `, [paginationId, '1', limit])

        res.status(200).json({
            Message: "Fetch Updated Price",
            count: getAllActiveCar.rowCount ?? 0,
            nextPaginationId:
                getAllActiveCar.rows.length > 0
                    ? getAllActiveCar.rows[
                        getAllActiveCar.rows.length - 1
                    ].id
                    : null,
            data: (getAllActiveCar.rowCount ?? 0) ? getAllActiveCar.rows : []

        })

    } catch (err: any) {
        res.status(500).json({
            message: err.message
        })
    }
})

export {
    feature_vehicles,
    getAllCarsDetails,
    getPricingList,
    getCarDetailsById
}