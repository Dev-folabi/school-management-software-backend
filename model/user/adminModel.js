const mongoose = require('mongoose');
const User = require('./usersModel');  
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  
});

adminSchema.add(User.schema)

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_PRIVATE_KEY);
    return token;
  };

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
