const mongoose = require('mongoose');
const today = new Date();

const todoSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    //
    default: `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일}`,
  },
});

module.exports = mongoose.model('ToDo', todoSchema);
