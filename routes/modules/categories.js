const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { formatDate } = require('../../utils')

router.get('/:id', (req, res) => {
  const categoryName = req.params.id
  const userId = req.user._id
  Category.findOne({ name: categoryName })
    .then(category => {
      Record.find({ category: category._id, userId })
        .sort({ date: -1 })
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

