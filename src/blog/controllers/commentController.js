const Comment = require('../model/commentModel');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const secretKey = config.jwtSecret;

const createComment = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authorization.split('Bearer ')[1];

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    const user_id = decoded.userId; // Get the user's ID from the token payload
    const { post_id, comment } = req.body;
    
    if (!comment) {
      return res.status(400).json({ error: 'Comment cannot be empty' });
    }
    
    try {
      const newComment = await Comment.create({ PostId: post_id, UserId: user_id, comment });
      res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

const getCommentsForPost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.findAll({ where: { PostId: postId } });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  const { comment } = req.body;

  try {
    const existingComment = await Comment.findByPk(commentId);

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authorization.split('Bearer ')[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      if (existingComment.UserId !== decoded.userId) {
        return res.status(403).json({ error: 'Unauthorized: You do not have permission to edit this comment' });
      }

      existingComment.comment = comment;
      await existingComment.save();
      res.status(200).json({ message: 'Comment updated successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const existingComment = await Comment.findByPk(commentId);

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authorization.split('Bearer ')[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      if (existingComment.UserId !== decoded.userId) {
        return res.status(403).json({ error: 'Unauthorized: You do not have permission to delete this comment' });
      }

      await existingComment.destroy();
      res.status(200).json({ message: 'Comment deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createComment,
  getCommentsForPost,
  updateComment,
  deleteComment,
};
