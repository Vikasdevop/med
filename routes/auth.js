const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

//login and register routes
router.post("/login", authController.login);
router.post("/register", authController.register);

// //Middleware auth testing route
// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

module.exports = router;
