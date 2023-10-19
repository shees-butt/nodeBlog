const { DataTypes } = require('sequelize');
const db = require('../../db');

// Define your Post model
const Post = db.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Post;
