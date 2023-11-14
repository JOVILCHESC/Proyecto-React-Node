'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Utentes', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    });

    await queryInterface.addColumn('Utentes', 'dateBorn', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Utentes', 'rut', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Utentes', 'email');
    await queryInterface.removeColumn('Utentes', 'dateBorn');
    await queryInterface.removeColumn('Utentes', 'rut');
  }
};
