const express = require("express");
const router = express.Router();
const authController = require("../../controllers/Login/LoginController");

router.post("/login", authController.login);
router.post("/forgot-Password", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

// //Middleware auth testing route
// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

module.exports = router;