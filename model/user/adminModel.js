const mongoose = require('mongoose');
const User = require('./usersModel');  // Ensure the correct path

const adminSchema = new mongoose.Schema({
  
});

const Admin = User.discriminator('Admin', adminSchema);

module.exports = Admin;
