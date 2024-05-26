const {User} = require('./usersModel')
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({})

const Admin = User.discriminator('admin', adminSchema)

module.exports = Admin;