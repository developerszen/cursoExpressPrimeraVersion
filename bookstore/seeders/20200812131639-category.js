'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [{
      name: 'Novela',
      description: 'descripcion de la categoria',
      slug: 'novela',
      is_deleted: false,
      created_by: 1,
      created_at: '12/08/2020',
      updated_by: 1,
      updated_at: '12/08/2020'
    }], {})
      .then(() => 
      queryInterface.bulkInsert('categories', [{
        name: 'Drama',
        description: 'descripcion de la categoria',
        slug: 'drama',
        is_deleted: false,
        created_by: 1,
        created_at: '12/08/2020',
        updated_by: 1,
        updated_at: '12/08/2020'
      }], {}))
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
