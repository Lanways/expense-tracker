const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

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

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  Category.findOne({ name: category })
    .then(categoryIcon => {
      // console.log('categoryIcon', categoryIcon)
      const recordData = {
        name,
        date,
        category: categoryIcon._id,
        amount,
        userId
      }
      // console.log('Post data', recordData)
      return Record.create(recordData)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .populate('category')
    .lean()
    .then(record => {
      record.date = formatDate(record.date)
      // console.log("edit record", record)
      res.render('edit', { record })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categoryName = req.body.category
  return Record.findOne({ _id, userId })
    .then(record => {
      // console.log('record', record)
      return Category.findOne({ name: categoryName })
        .then(category => {
          req.body.category = category._id
          Object.assign(record, req.body) //like record = req.body
          return record.save()
        })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router