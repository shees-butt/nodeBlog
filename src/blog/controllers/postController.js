const Post = require('../model/postModel');
const Comment = require('../model/commentModel'); 
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const secretKey = config.jwtSecret;

const createPost = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authorization.split('Bearer ')[1];

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // console.log(decoded.userId)
    
    try {
      const user_id = decoded.userId; // Get the user's ID from the token payload
      const { title, content } = req.body;
      const newPost = await Post.create({ title, content, UserId: user_id });
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authorization.split('Bearer ')[1];

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    try {
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.UserId !== decoded.userId) {
        return res.status(403).json({ error: 'Unauthorized: You do not have permission to edit this post' });
      }      

      post.title = title;
      post.content = content;
      await post.save();

      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authorization.split('Bearer ')[1];

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    try {
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.UserId !== decoded.userId) {
        return res.status(403).json({ error: 'Unauthorized: You do not have permission to delete this post' });
      }

      await post.destroy();
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
