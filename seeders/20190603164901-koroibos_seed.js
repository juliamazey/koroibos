'use strict';
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */


    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Event', null, {});
    return queryInterface.bulkDelete('Medalist', null, {});
    return queryInterface.bulkDelete('Olympian', null, {});
  }
};
