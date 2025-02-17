const express = require("express");
const router = express.Router();
const authController = require("../../controllers/Admin/AdminController");

router.post("/AdminRegister", authController.AdminRegister);

// //Middleware auth testing route
// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

module.exports = router;
