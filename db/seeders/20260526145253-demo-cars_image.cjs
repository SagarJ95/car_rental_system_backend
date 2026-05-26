"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const carImages = [];


    for (let carId = 1; carId <= 100000; carId++) {

      for (let img = 1; img <= 3; img++) {

        carImages.push({
          car_id: carId,

          car_image: `https://picsum.photos/seed/car${carId}_${img}/600/400`,

          status: "1",

          created_by: 1,
          updated_by: 1,
          deleted_by: null,

          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        });
      }
    }

    // Insert in chunks
    const chunkSize = 5000;

    for (let i = 0; i < carImages.length; i += chunkSize) {

      const chunk = carImages.slice(i, i + chunkSize);

      await queryInterface.bulkInsert("tbl_cars_image", chunk);
    }
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("tbl_cars_image", null, {});
  },
};