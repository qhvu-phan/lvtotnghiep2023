'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        visible_id: '4kdDbwcxAEiNznrXRxuA',
        username: 'justinphan',
        passwords: '$2b$10$cwQBKneY28wh9VsjcIKhqO2Iv0DtTjx1/MxMFnAkHH3XjCI.M7VUW',
        email:'qhvu.phan@gmail.com',
        phone: '0767958005',
        address: 'số 382, ấp 8, xã Long Trị, Tx. Long Mỹ, tỉnh Hậu Giang',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};