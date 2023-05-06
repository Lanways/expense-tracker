const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { formatDate } = require('../../utils')

router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryObj = {}
  Category.find()
    .lean()
    .then(categorise => {
      categorise.forEach(category => {
        categoryObj[category._id.toString()] = category
      })
      return Record.find({ userId })
        .sort({ date: 'desc' })
        .lean()
        .then(records => {
          records = records.map(record => {
            const categoryId = record.category.toString()
            record.category = categoryObj[categoryId]
            record.date = formatDate(record.date)
            return record
          })
          res.render('index', { records })
        })
        .catch(err => console.log(err))
    })

  // Record.find({ userId })
  //   .populate('category')
  //   .lean()
  //   .then(records => {
  //     console.log('records', records) //console
  //     records = records.map(record => {
  //       record.date = formatDate(record.date)
  //       record.categoryIcon = record.category.icon
  //       return record
  //     })
  //     res.render('index', { records })
  //   })
  //   .catch(err => console.log(err))
})

module.exports = router