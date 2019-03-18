const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  gender: String,
  age: Number
});

const Student = mongoose.model('Student', studentSchema)

module.exports = Student