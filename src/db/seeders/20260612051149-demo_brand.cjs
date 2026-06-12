'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const brands = [
      'Maruti Suzuki',
      'Hyundai',
      'Tata',
      'Mahindra',
      'Honda',
      'Toyota',
      'Kia',
      'MG',
      'Skoda',
      'Volkswagen',
      'Renault',
      'Nissan',
      'Ford',
      'Jeep',
      'BMW',
      'Mercedes-Benz',
      'Audi',
      'Lexus',
      'Volvo',
      'Jaguar'
    ].map(brand => ({
      brand_name: brand,
      status: '1',
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 1,
      updated_by: 1
    }));

    await queryInterface.bulkInsert('tbl_brand', brands);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_brand', null, {});
  }
};