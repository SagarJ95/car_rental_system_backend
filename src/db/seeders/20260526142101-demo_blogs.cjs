'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const blogs = [];
    for (let i = 1; i <= 100000; i++) {
      blogs.push({
        title: `Blog Title ${i}`,
        description: `This is description for blog ${i}`,
        tags: `tag${i}`,
        image: `https://picsum.photos/seed/${i}/600/400`,
        status: "1",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Insert in chunks for better performance
    const chunkSize = 5000;

    for (let i = 0; i < blogs.length; i += chunkSize) {
      const chunk = blogs.slice(i, i + chunkSize);

      await queryInterface.bulkInsert('tbl_blogs', chunk);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_blogs', null, {});
  }
};
