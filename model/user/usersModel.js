const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const options = {discriminatorKey: 'role', collection: 'user'}
// Define the schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlenght: 6,
    required: true,
  },
  role: {type: String, required: true, enum : ['super_admin', 'admin', 'teacher', 'accountant', 'librarian', 'student', 'parent']},
  createdAt: {type: Date, default: Date.now}
}, options);


// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
//   return token;
// };


// Create the model
const user = mongoose.model("User", userSchema);


// Export the model and validation function
module.exports = {
  User: user
};
