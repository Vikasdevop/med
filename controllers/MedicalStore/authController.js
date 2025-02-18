const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const MedicalStore = require("../../models/MedicalStoreModel/MedicalStore");
const axios = require("axios"); // ✅ Correct


exports.medicalStoreRegister = async (req, res) => {
  try {
    const {
      name,
      username,
      phone,
      email,
      password,
      confirmPassword,
      GSTnumber,
      LicenseNumber,
      ShopAddress,
      Pincode,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
   

    const hashedPassword = await bcrypt.hash(password, 8);
    
    const response = await axios.post(
      "http://localhost:3000/api/auth/verify-gst",
      { gstin: GSTnumber },
      { headers: { "Content-Type": "application/json" } }
   );
   
    if (response.data.message != "GSTIN  found.") {
      return res.status(400).json({ message: "Invalid GST number" });
    }
    if (name.trim().toUpperCase() !== response.data.data.lgnm.trim().toUpperCase()) {
      
      return res.status(400).json({ message: "GST Register Name and Name provided do not match" });
    }
    const MedicalData = new MedicalStore({
      name,
      username,
      phone,
      email,
      password: hashedPassword,
      GSTnumber,
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

