const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MedicalStore = require("../../models/MedicalStoreModel/MedicalStore");

exports.medicalStoreRegister = async (req, res) => {
  try {
    const {
      name,
      username,
      phone,
      email,
      password,
      confirmPassword,
      LicenseNumber,
      ShopAddress,
      Pincode,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const MedicalData = new MedicalStore({
      name,
      username,
      phone,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      LicenseNumber,
      ShopAddress,
      Pincode,
    });
    

    await MedicalData.save();
    res.status(201).json({ message: "Medical Store registered successfully"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering in Medical Store", error: error.message });
  }
};

