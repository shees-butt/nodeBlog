const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const userAuthMiddleware = require("../middleware/userAuthMiddleware");

// Define separate route groups for admin and user
const adminRoutes = express.Router();
const userRoutes = express.Router();

// Admin routes with the "/admin" prefix
adminRoutes.post('/createPost', PostController.createPost);
adminRoutes.get('/showPosts', PostController.getAllPosts);
adminRoutes.get('/singlePost/:id', PostController.getPostById);
adminRoutes.put('/editPost/:id', PostController.updatePost);
adminRoutes.delete('/deletePost/:id', PostController.deletePost);

// User routes with the "/user" prefix
userRoutes.post('/createPost', PostController.createPost);
userRoutes.get('/showPosts', PostController.getAllPosts);
userRoutes.get('/singlePost/:id', PostController.getPostById);
userRoutes.put('/editPost/:id', PostController.updatePost);
userRoutes.delete('/deletePost/:id', PostController.deletePost);

// Attach the route groups to the main router with prefixes
router.use('/admin', adminAuthMiddleware, adminRoutes);
router.use('/user', userAuthMiddleware, userRoutes);

module.exports = router;
