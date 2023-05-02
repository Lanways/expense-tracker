const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


function formatDate(date) {
  // send date then new date
  const d = new Date(date)
  // get year
  const year = d.getFullYear()
  // js month range 0-11所以+1，padStart補足2位數不足用0填充
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      records = records.map(record => {
        record.date = formatDate(record.date)
        return record
      })
      res.render('index', { records })
    })
    .catch(err => console.log(err))
})

module.exports = router