"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_cars_image", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      car_id: {
        type: Sequelize.INTEGER,
      },
      car_image: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("tbl_cars_image");
  },
};