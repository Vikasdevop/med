const mongoose = require("mongoose");

const MedicalStoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  GSTnumber: { type: String, required: function() {
    return this.isNew;
  } },
  LicenseNumber: { type: String, required: true },
  ShopAddress: { type: String, required: true },
  Pincode: { type: Number, required: function() {
    return this.isNew;
  } },
});

module.exports = mongoose.model("MedicalStore", MedicalStoreSchema);