const { DataTypes } = require('sequelize');
const db = require('../../db');

const Comment = db.define('Comment', {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Comment;
