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

router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryObj = {}
  Category.find()
    .lean()
    .then(categorise => {
      // console.log('categorise', categorise)
      categorise.forEach(category => {
        // console.log('category', category)
        categoryObj[category._id.toString()] = category
        // console.log('categoryObj', categoryObj)
      })
      return Record.find({ userId })
        .lean()
        .then(records => {
          // console.log('records', records)
          records = records.map(record => {
            const categoryId = record.category.toString()
            record.category = categoryObj[categoryId]
            record.date = formatDate(record.date)
            // console.log('records', records)
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