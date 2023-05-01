const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Record', recordSchema)