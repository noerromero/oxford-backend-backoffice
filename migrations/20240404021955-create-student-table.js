"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "student",
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        dni: {
          type: Sequelize.STRING(8),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        surname: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        second_surname: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        birthday: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        cellphone: {
          type: Sequelize.STRING(15),
          allowNull: true,
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
        comment: {
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
        legal_representative_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        legal_representative_surname: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        legal_representative_second_surname: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        legal_representative_phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        legal_representative_cellphone: {
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
    await queryInterface.dropTable("backoffice.student");
  },
};
