const mongoose = require('mongoose');
const User = require('./usersModel');  // Ensure the correct path

const adminSchema = new mongoose.Schema({
  
});

adminSchema.add(User.schema)
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
