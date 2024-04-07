"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "legal_representative",
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
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        surname: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        second_surname: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        cellphone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        schema: "backoffice",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("backoffice.legal_representative");
  },
};
