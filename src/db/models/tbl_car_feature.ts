"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const tbl_car_feature = sequelize.define(
    "tbl_car_feature",
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
        feature_id: {
            type: DataTypes.INTEGER,
        },
        feature_status: {
            type: DataTypes.INTEGER,
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
        modelName: "tbl_brand",
    }
);

export default tbl_car_feature;