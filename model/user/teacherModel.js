const mongoose = require('mongoose');
const User = require('./usersModel');  

const teacherSchema = new mongoose.Schema({
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],  
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subjects' }],
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
}, { discriminatorKey: 'role' });

const Teacher = User.discriminator('Teacher', teacherSchema);

module.exports = Teacher;
