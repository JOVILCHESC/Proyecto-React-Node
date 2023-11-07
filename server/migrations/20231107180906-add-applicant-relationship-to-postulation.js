'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('Postulations', 'applicantId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Applicants',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Postulations', 'applicantId');
  }
};
