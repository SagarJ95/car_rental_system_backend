"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
const tbl_cars_review = sequelize.define("tbl_cars_review", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    car_id: {
        type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    review: {
        type: DataTypes.TEXT,
    },
    car_status: {
        type: DataTypes.ENUM("0", "1", "2"),
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
}, {
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    modelName: "tbl_cars_review",
});
export default tbl_cars_review;
//# sourceMappingURL=tbl_cars_review.js.map