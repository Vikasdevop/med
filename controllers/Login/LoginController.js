const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter = require("../../config/nodemailerConfig");
const Customer = require("../../models/CustomerModel/Customer");
const MedicalStore = require("../../models/MedicalStoreModel/MedicalStore");
const Admin = require("../../models/AdminModel/Admin");

//login
exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    console.log("Login Request:", req.body);
    if ((!email && !username) || !password) {
      return res
        .status(400)
        .json({ error: "Email or username and password are required" });
    }

    const query = {};
    if (email) query.email = email.toLowerCase();
    if (username) query.username = username;

    let user = await Customer.findOne(query);
    if (!user) {
      user = await MedicalStore.findOne(query);
    }
    if (!user) {
      user = await Admin.findOne(query);
    }

    console.log("User Found:", user);
    if (!user || !user.password) {
      return res
        .status(400)
        .json({ error: "Invalid email/username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

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
    console.error("Login Error:", error);
    res.status(500).json({ error: "Error logging in", message: error.message });
  }
};

//forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:3000/api/auth/resetPassword/${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    const user = await Customer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "customer not found" });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 8);

    user.password = hashedPasswo2rd;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error",error});
  }
};
