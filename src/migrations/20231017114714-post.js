'use strict';
const db = require('../db'); // Import db.js file where Sequelize is defined

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Posts', {
      id: {
        type: db.Sequelize.INTEGER, 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: db.Sequelize.STRING, 
        allowNull: false,
      },
      content: {
        type: db.Sequelize.TEXT, 
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
      UserId: {
        type: db.Sequelize.INTEGER, 
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Posts');
  },
};
