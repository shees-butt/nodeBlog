const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

// Create a router specifically for admin routes
const adminRouter = express.Router();

// Define admin routes
adminRouter.get('/users', userController.getAllUsers);
adminRouter.delete('/users/:id', userController.deleteUser);

// Attach the adminRouter with a prefix to the main router
router.use('/admin', adminAuthMiddleware, adminRouter);

module.exports = router;