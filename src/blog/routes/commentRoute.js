const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");


// Create a new comment for a post
router.post('/createComment', CommentController.createComment);

// Retrieve all comments for a specific post
router.get('/commentsForPost/:postId', CommentController.getCommentsForPost);

// Update a comment by ID
router.put('/updateComment/:commentId', CommentController.updateComment);

// Delete a comment by ID
router.delete('/deleteComment/:commentId', CommentController.deleteComment);

module.exports = router;
