"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
const users = sequelize.define("user", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Role cannot be null",
            },
            notEmpty: {
                msg: "Role cannot be empty",
            },
        },
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "First Name cannot be null",
            },
            notEmpty: {
                msg: "First Name cannot be empty",
            },
        },
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "last Name cannot be null",
            },
            notEmpty: {
                msg: "last Name cannot be empty",
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email cannot be null",
            },
            notEmpty: {
                msg: "Email cannot be empty",
            },
            isEmail: {
                msg: "Invalid email address",
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password cannot be null",
            },
            notEmpty: {
                msg: "Password cannot be empty",
            },
        },
    },
    enc_password: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    iv_key: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    modelName: "users",
});
export default users;
//# sourceMappingURL=users.js.map