'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('books', [{
      isbn: '1-001-1548-5',
      title: 'Harry Potter y la piedra filosofal',
      slug: 'harry-potter-y-la-piedra-filosofal',
      synopsis: 'synopsis del libro',
      fk_category: 1,
      url_image:'',
      is_deleted: false,
      created_by: 1,
      created_at: '12/08/2020',
      updated_by: 1,
      updated_at: '12/08/2020'
    }], {})
      .then(() => 
      queryInterface.bulkInsert('books', [{
        isbn: '1-001-1484-7',
        title: 'Cien años de soledad',
        slug: 'cien-años-de-soledad',
        synopsis: 'synopsis del libro',
        fk_category: 2,
        url_image:'',
        is_deleted: false,
        created_by: 1,
        created_at: '12/08/2020',
        updated_by: 1,
        updated_at: '12/08/2020'
      }], {}))
},

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
