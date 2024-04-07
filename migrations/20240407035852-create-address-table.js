'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('address', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      student_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true
      },
      neighborhood : {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      reference: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
    },
    {
      schema: 'backoffice',
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('backoffice.address');
  }
};
