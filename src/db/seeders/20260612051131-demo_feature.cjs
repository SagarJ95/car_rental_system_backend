'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const features = [
      'Air Conditioning',
      'Power Steering',
      'Power Windows',
      'ABS',
      'Airbags',
      'Bluetooth',
      'USB Charger',
      'GPS Navigation',
      'Reverse Camera',
      'Parking Sensors',
      'Cruise Control',
      'Sunroof',
      'Leather Seats',
      'Heated Seats',
      'Keyless Entry',
      'Push Button Start',
      'Android Auto',
      'Apple CarPlay',
      'Alloy Wheels',
      'Fog Lamps'
    ].map(feature => ({
      feature_name: feature,
      status: '1',
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 1,
      updated_by: 1
    }));

    await queryInterface.bulkInsert('tbl_feature', features);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_feature', null, {});
  }
};