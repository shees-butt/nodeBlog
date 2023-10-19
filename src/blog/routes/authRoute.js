const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// Define routes for user signup and login
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

module.exports = router;
