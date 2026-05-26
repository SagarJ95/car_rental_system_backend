"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
const tbl_cars = sequelize.define("tbl_cars", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    car_name: {
        type: DataTypes.STRING,
    },
    mileage: {
        type: DataTypes.STRING,
    },
    transmission: {
        type: DataTypes.ENUM("0", "1"),
    },
    seats: {
        type: DataTypes.STRING,
    },
    luggage: {
        type: DataTypes.STRING,
    },
    fuel: {
        type: DataTypes.ENUM("0", "1", "2", "3"),
    },
    description: {
        type: DataTypes.NUMBER,
    },
    brand_id: {
        type: DataTypes.INTEGER,
    },
    car_number: {
        type: DataTypes.STRING,
    },
    model: {
        type: DataTypes.STRING,
    },
    color: {
        type: DataTypes.STRING,
    },
    main_image: {
        type: DataTypes.STRING,
    },
    is_available: {
        type: DataTypes.INTEGER,
    },
    feature_vehicles_status: {
        type: DataTypes.ENUM("0", "1"),
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
    modelName: "tbl_cars",
});
export default tbl_cars;
//# sourceMappingURL=tbl_cars.js.map