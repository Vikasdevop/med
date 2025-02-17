const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/AdminModel/Admin.js");

exports.AdminRegister = async (req, res) => {
  try {
    const {
      name,
      username,
      phone,
      email,
      password,
      confirmPassword,
      age,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const admin = new Admin({
      name,
      username,
      phone,
      email,
      password: hashedPassword,
      age,
    });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering Admin", error: error.message });
  }
};

