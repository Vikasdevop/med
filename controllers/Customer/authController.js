const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../../models/CustomerModel/Customer");


exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    let user = await Customer.findOne({ username });
    if (!user) {
      user = await Customer.findOne({ email });
    }

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid email/username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid email/username or password" });
    }

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in", error: error.message });
  }
};

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
      confirmPassword: hashedPassword,
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

