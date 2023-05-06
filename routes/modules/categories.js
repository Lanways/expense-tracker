const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

function formatDate(date) {
  // send date then new date
  const d = new Date(date)
  // get year
  const year = d.getFullYear()
  // js month range 0-11所以+1，padStart補足2位數不足用0填充
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

router.get('/:id', (req, res) => {
  const categoryName = req.params.id
  const userId = req.user._id
  Category.findOne({ name: categoryName })
    .then(category => {
      Record.find({ category: category._id, userId })
        .populate('category')
        .lean()
        .then(records => {
          records.forEach(record => {
            record.date = formatDate(record.date)
          })
          res.render('index', { records })
        })
    })
    .catch(err => console.log(err))

})

module.exports = router

