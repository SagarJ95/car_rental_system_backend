"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const carPrices = [];

    for (let carId = 1; carId <= 100000; carId++) {

      const basePrice = 500 + (carId % 500);

      carPrices.push({
        car_id: carId,

        per_hours_rate: `${basePrice}`,

        per_day_rate: `${basePrice * 10}`,

        leasing: `${basePrice * 300}`,

        status: "1",

        created_by: 1,
        updated_by: 1,
        deleted_by: null,

        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    // Insert in chunks (important for performance)
    const chunkSize = 5000;

    for (let i = 0; i < carPrices.length; i += chunkSize) {

      const chunk = carPrices.slice(i, i + chunkSize);

      await queryInterface.bulkInsert("tbl_cars_prices", chunk);
    }
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("tbl_cars_prices", null, {});
  },
};