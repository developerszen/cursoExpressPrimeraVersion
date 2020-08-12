'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('authors', [{
        name: 'Gabrel Garcia Marquez',
        slug: 'gabriel-garcia-marquez',
        is_deleted: false,
        created_by: 1,
        created_at: '12/08/2020',
        updated_by: 1,
        updated_at: '12/08/2020'
      }], {})
        .then(() => 
        queryInterface.bulkInsert('authors', [{
          name: 'J.K Rowling',
          slug: 'j-k-rowling',
          is_deleted: false,
          created_by: 1,
          created_at: '12/08/2020',
          updated_by: 1,
          updated_at: '12/08/2020'
        }], {}))
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('authors', null, {});
  }
};
