const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const userAuthMiddleware = require("../middleware/userAuthMiddleware");

// Define separate route groups for admin and user
const adminRoutes = express.Router();
const userRoutes = express.Router();

// Admin routes with the "/admin" prefix
adminRoutes.post('/createComment', adminAuthMiddleware, CommentController.createComment);
adminRoutes.put('/updateComment/:commentId', adminAuthMiddleware, CommentController.updateComment);
adminRoutes.delete('/deleteComment/:commentId', adminAuthMiddleware, CommentController.deleteComment);

// User routes with the "/user" prefix
userRoutes.post('/createComment', userAuthMiddleware, CommentController.createComment);
userRoutes.put('/updateComment/:commentId', userAuthMiddleware, CommentController.updateComment);
userRoutes.delete('/deleteComment/:commentId', userAuthMiddleware, CommentController.deleteComment);

// Admin and user can view comments
adminRoutes.get('/commentsForPost/:postId', CommentController.getCommentsForPost);
userRoutes.get('/commentsForPost/:postId', CommentController.getCommentsForPost);

// Attach the route groups to the main router with prefixes
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);

module.exports = router;
