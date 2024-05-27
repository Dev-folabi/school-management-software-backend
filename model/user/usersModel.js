const mongoose = require('mongoose');

const options = { discriminatorKey: 'role', collection: 'user' };


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
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['super_admin', 'admin', 'teacher', 'accountant', 'librarian', 'student', 'parent'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, options);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_PRIVATE_KEY);
  return token;
};

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
