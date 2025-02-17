const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // confirmPassword: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
