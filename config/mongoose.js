const mongoose = require('mongoose')

mongoose.connect(process.env.MOGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongoose connected!')
})

module.exports = db