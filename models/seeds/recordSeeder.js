if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const Record = require('../record')
const db = require('../../config/mongoose')
const Category = require('../../models/category')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '123',
  records: [
    {
      name: 'Breakfast',
      date: '2022-01-01',
      category: '餐飲食品',
      amount: 50
    },
    {
      name: 'taxi',
      date: '2022-01-02',
      category: '交通出行',
      amount: 100
    },
    {
      name: 'camp',
      date: '2022-01-02',
      category: '休閒娛樂',
      amount: 999
    }
  ]
}

db.once('open', () => {
  const categoryObj = {}

  Category.find()
    .then(categorys => {
      categorys.forEach(category => {
        categoryObj[category.name] = category._id
      })
    })
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      const records = SEED_USER.records.map(record => {
        const newRecord = {
          name: record.name,
          date: record.date,
          amount: record.amount,
          category: categoryObj[record.category],
          userId
        }
        return newRecord
      })
      return Record.create(records)
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})
