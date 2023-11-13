'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Applicants', 'cvFile', {
      type: Sequelize.STRING, // o TEXT si prefieres almacenar la ruta completa
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Applicants', 'cvFile');
  }
};
