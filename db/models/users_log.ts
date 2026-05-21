"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const users_log = sequelize.define(
    "users_log",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        login_in: {
            type: DataTypes.DATE,
        },
        token: {
            type: DataTypes.STRING,
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        created_by: {
            type: DataTypes.INTEGER
        },
    },
    {
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        modelName: "users_log",
    }
);

export default users_log;