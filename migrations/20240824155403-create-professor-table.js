'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('professor', {
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
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cellphone: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
    },
    {
      schema: 'backoffice',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("backoffice.professor");
  }
};
