"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const cars = [];

    const carNames = [
      "Swift",
      "Creta",
      "Fortuner",
      "Innova",
      "City",
      "Verna",
      "Thar",
      "XUV700",
      "Baleno",
      "i20"
    ];

    const colors = [
      "White",
      "Black",
      "Silver",
      "Blue",
      "Red",
      "Grey"
    ];

    for (let i = 1; i <= 100000; i++) {

      cars.push({
        car_name: `${carNames[i % carNames.length]} ${i}`,

        mileage: `${10 + (i % 15)} kmpl`,

        transmission: i % 2 === 0 ? "1" : "0",
        // 0 = Manual
        // 1 = Automatic

        seats: `${4 + (i % 4)}`,

        luggage: `${1 + (i % 5)} Bags`,

        fuel: `${i % 4}`,
        // 0 = Petrol
        // 1 = Diesel
        // 2 = CNG
        // 3 = Electric

        description: `This is demo description for car ${i}`,

        brand_id: (i % 10) + 1,

        car_number: `MH01AB${1000 + i}`,

        model: `Model-${2020 + (i % 6)}`,

        color: colors[i % colors.length],

        car_image: `https://picsum.photos/seed/car${i}/600/400`,

        is_available: i % 2,

        feature_vehicles_status: i % 2 === 0 ? "1" : "0",

        status: "1",

        created_by: 1,
        updated_by: 1,
        deleted_by: null,

        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    // Bulk insert in chunks
    const chunkSize = 5000;

    for (let i = 0; i < cars.length; i += chunkSize) {

      const chunk = cars.slice(i, i + chunkSize);

      await queryInterface.bulkInsert("tbl_cars", chunk);
    }
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("tbl_cars", null, {});
  },
};