"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const reviews = [];

    const sampleReviews = [
      "Excellent car condition and smooth drive.",
      "Very comfortable and clean vehicle.",
      "Good experience, but mileage could be better.",
      "Amazing performance and handling.",
      "Not satisfied with interior quality.",
      "Value for money car rental.",
      "Smooth booking and pickup experience.",
      "Car was well maintained and clean.",
      "Average experience overall.",
      "Highly recommended for long trips."
    ];

    for (let carId = 1; carId <= 100000; carId++) {

      // 1–3 reviews per car (random)
      const reviewCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < reviewCount; i++) {

        reviews.push({
          car_id: carId,

          rating: Math.floor(Math.random() * 5) + 1, // 1 to 5

          review: sampleReviews[Math.floor(Math.random() * sampleReviews.length)],

          car_status: `${Math.floor(Math.random() * 3)}`,
          // 0 = bad, 1 = good, 2 = excellent

          status: "1",

          created_by: Math.floor(Math.random() * 50) + 1,

          updated_by: Math.floor(Math.random() * 50) + 1,

          deleted_by: null,

          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        });
      }
    }

    // Insert in chunks for performance
    const chunkSize = 5000;

    for (let i = 0; i < reviews.length; i += chunkSize) {

      const chunk = reviews.slice(i, i + chunkSize);

      await queryInterface.bulkInsert("tbl_cars_review", chunk);
    }
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("tbl_cars_review", null, {});
  },
};