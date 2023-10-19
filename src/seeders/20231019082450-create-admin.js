'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('shees123', 10); // Hash the password

    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword, // Use the hashed password
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
