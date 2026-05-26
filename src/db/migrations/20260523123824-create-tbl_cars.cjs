"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      car_name: {
        type: Sequelize.STRING,
      },
      mileage: {
        type: Sequelize.STRING,
      },
      transmission: {
        type: Sequelize.ENUM("0", "1"),
      },
      seats: {
        type: Sequelize.STRING,
      },
      luggage: {
        type: Sequelize.STRING,
      },
      fuel: {
        type: Sequelize.ENUM("0", "1", "2", "3"),
      },
      description: {
        type: Sequelize.STRING,
      },
      brand_id: {
        type: Sequelize.INTEGER,
      },
      car_number: {
        type: Sequelize.STRING,
      },
      model: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      main_image: {
        type: Sequelize.STRING,
      },
      is_available: {
        type: Sequelize.INTEGER,
      },
      feature_vehicles_status: {
        type: Sequelize.ENUM("0", "1"),
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
    await queryInterface.dropTable("tbl_cars");
  },
};