'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Carlos',
      last_name: 'Ramirez',
      email: 'cramirez@gmail.com',
      password: '123',
      created_at: '12/08/2020',
      updated_at: '12/08/2020'
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('users', null, {});
  }
};
