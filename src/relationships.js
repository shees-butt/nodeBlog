// Import models
const User = require('./blog/model/authModel');
const Post = require('./blog/model/postModel');
const Comment = require('./blog/model/commentModel');

// Define relationships

// for auth
User.hasMany(Post);
User.hasMany(Comment);

// for post
Post.belongsTo(User, { foreignKey: 'UserId' });
Post.hasMany(Comment);

// for comment
Comment.belongsTo(User);
Comment.belongsTo(Post);
