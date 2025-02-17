const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../../models/CustomerModel/Customer");

exports.customerRegister = async (req, res) => {
  try {
    const {
      name,
      username,
      phone,
      email,
      password,
      confirmPassword,
      age,
      Address,
      Pincode,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const customer = new Customer({
      name,
      username,
      phone,
      email,
      password: hashedPassword,
      age,
      Address,
      Pincode,
    });
    await customer.save();
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering customer", error: error.message });
  }
};

