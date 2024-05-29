const mongoose = require('mongoose');
const User = require('./usersModel');
const jwt = require('jsonwebtoken');

const staffSchema = new mongoose.Schema({
  DOB: {
    type: Date,
  },
  salary: {
    type: String,
  },
  qualification: {
    type: String,
  },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subjects' }],
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }


});

staffSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_PRIVATE_KEY);
  return token;
};

staffSchema.add(User.schema)
const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
