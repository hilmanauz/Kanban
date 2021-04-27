'use strict';
const category = [
  {
    name: 'Backlog',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    name: 'Development',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Done',
    updatedAt: new Date(),
    createdAt: new Date(),
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Categories', category, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
