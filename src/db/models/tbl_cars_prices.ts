"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const tbl_cars_prices = sequelize.define(
    "tbl_cars_prices",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        car_id: {
            type: DataTypes.INTEGER,
        },
        per_hours_rate: {
            type: DataTypes.STRING,
        },
        leasing: {
            type: DataTypes.STRING,
        },
        per_day_rate: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM("0", "1"),
            defaultValue: "1",
            allowNull: false,
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        deleted_at: {
            type: DataTypes.DATE,
        },
        created_by: {
            type: DataTypes.INTEGER
        },
        updated_by: {
            type: DataTypes.INTEGER
        },
    },
    {
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        modelName: "tbl_cars_prices",
    }
);

export default tbl_cars_prices;