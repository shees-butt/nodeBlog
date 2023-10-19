'use strict';
const db = require('../db'); // Import db.js file where Sequelize is defined

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Users', {
      id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: db.Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: db.Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: db.Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: db.Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
