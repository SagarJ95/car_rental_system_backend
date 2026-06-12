"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const tbl_feature = sequelize.define(
    "tbl_feature",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        feature_name: {
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
        modelName: "tbl_feature",
    }
);

export default tbl_feature;