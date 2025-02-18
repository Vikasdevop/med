const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  Address: { type: String, required: true },
  Pincode: { type: Number, required: function() {
      return this.isNew;
    } },
});

module.exports = mongoose.model("Customer", customerSchema);
