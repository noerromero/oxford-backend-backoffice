"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "course",
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
      },
      {
        schema: "backoffice",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("backoffice.course");
  },
};
