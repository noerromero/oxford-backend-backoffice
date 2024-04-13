"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "student_folder",
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        student_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        academic_institution: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        workplace: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        english_certificate: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        schema: "backoffice",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("backoffice.student_folder");
  },
};
