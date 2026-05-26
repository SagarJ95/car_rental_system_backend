"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_users_profile", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      date_of_birth: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM("0", "1"),
      },
      photo: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      pincode: {
        type: Sequelize.INTEGER,
      },
      address_1: {
        type: Sequelize.STRING,
      },
      address_2: {
        type: Sequelize.STRING,
      },
      driving_license: {
        type: Sequelize.STRING,
      },
      driving_license_photo: {
        type: Sequelize.STRING,
      },
      aadhar_card: {
        type: Sequelize.STRING,
      },
      mobile_number: {
        type: Sequelize.STRING,
      },
      email_expire_otp_at: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("0", "1"),
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      deleted_by: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_users_profile");
  },
};