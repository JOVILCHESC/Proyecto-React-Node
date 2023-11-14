'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Applicants', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    });

    await queryInterface.addColumn('Applicants', 'dateBorn', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Applicants', 'rut', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Applicants', 'email');
    await queryInterface.removeColumn('Applicants', 'dateborn');
    await queryInterface.removeColumn('Applicants', 'rut');
  }
};
