'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const carFeatures = [];

    for (let carId = 1; carId <= 20; carId++) {
      for (let featureId = 1; featureId <= 10; featureId++) {
        carFeatures.push({
          car_id: carId,
          feature_id: featureId,
          feature_status: Math.random() > 0.3 ? 1 : 0,
          status: '1',
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1
        });
      }
    }

    await queryInterface.bulkInsert(
      'tbl_car_feature',
      carFeatures
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'tbl_car_feature',
      null,
      {}
    );
  }
};