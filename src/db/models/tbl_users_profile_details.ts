"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const users_profile = sequelize.define(
    "tbl_users_profile",
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
        date_of_birth: {
            type: DataTypes.DATE,
        },
        gender: {
            type: DataTypes.ENUM("0", "1"),
            defaultValue: "1",
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        pincode: {
            type: DataTypes.NUMBER,
        },
        address_1: {
            type: DataTypes.STRING,
        },
        address_2: {
            type: DataTypes.STRING,
        },
        driving_license: {
            type: DataTypes.STRING,
        },
        driving_license_photo: {
            type: DataTypes.STRING,
        },
        aadhar_card: {
            type: DataTypes.STRING,
        },
        mobile_number: {
            type: DataTypes.STRING,
        },
        email_expire_otp_at: {
            type: DataTypes.DATE,
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
        modelName: "tbl_users_profile",
    }
);

export default users_profile;