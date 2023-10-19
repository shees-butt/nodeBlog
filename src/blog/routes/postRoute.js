const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");

// posts routes

// Create a new post
router.post('/createPost', PostController.createPost);

// Retrieve all posts
router.get('/showPosts', PostController.getAllPosts);

// Retrieve a single post by ID
router.get('/singlePost/:id', PostController.getPostById);

// Update a post by ID
router.put('/editPost/:id', PostController.updatePost);

// Delete a post by ID
router.delete('/deletePost/:id', PostController.deletePost);

module.exports = router;
