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
const project_name = process.env.APP_NAME;
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
/********************************************************* Feture Vehicles Car ************************************************* */
//display All Blogs with pageniation
const shows_blogs = catchAsync(async (req, res) => {
    console.log("req.body>>", req.body);
    try {
        let { paginationId } = req.body;
        let getblogsVehicales = await db.query(`select id,description,tags,image,status,created_at from tbl_blogs 
              where status = $1 and id > $2 Limit 2`, ["1", paginationId ?? 0]);
        res.status(200).json({
            message: "get Blogs details",
            data: (getblogsVehicales.rowCount ?? 0) > 0 ? getblogsVehicales.rows : []
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
const getblogsdetailsBasedId = catchAsync(async (req, res) => {
    try {
        let id = req.params.id;
        let fetchBlogsDetails = await db.query(`select id,description,tags,status,created_at from tbl_blogs 
              where id=$1 and status = $2 `, [id, "1"]);
        if (fetchBlogsDetails.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Blog details not found",
            });
        }
        res.status(200).json({
            message: "Fetch blogs details Successfully",
            data: fetchBlogsDetails.rows
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
export { shows_blogs, getblogsdetailsBasedId };
//# sourceMappingURL=BlogsApiController.js.map