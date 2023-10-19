'use strict';
const db = require('../db'); // Import db.js file where Sequelize is defined

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: db.Sequelize.INTEGER, 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: db.Sequelize.TEXT, 
        allowNull: false,
      },
      created_at: {
        type: db.Sequelize.DATE, 
        allowNull: false,
      },
      UserId: {
        type: db.Sequelize.INTEGER, 
        references: {
          model: 'Users', // it is table name Users from there it get the i.d in key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      PostId: {
        type: db.Sequelize.INTEGER, 
        references: {
          model: 'Posts', // it is table name Posts from there it get the i.d in key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Comments');
  },
};