const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});x

module.exports = mongoose("admin", adminSchema);
