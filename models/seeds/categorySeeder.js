if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
const CATEGORY = [
  { name: '家居物業', icon: 'fa-solid fa-house fa-2xl' },
  { name: '交通出行', icon: 'fa-solid fa-van-shuttle fa-2xl' },
  { name: '休閒娛樂', icon: 'fa-solid fa-face-grin-beam fa-2xl' },
  { name: '餐飲食品', icon: 'fa-solid fa-utensils fa-2xl' },
  { name: '其他', icon: 'fa-solid fa-pen fa-2xl' }
]
db.once('open', () => {



  Promise.all(CATEGORY.map(category => {
    const name = category.name
    return Category.findOne({ name })
      .then(categorydata => {
        if (!categorydata) {
          return Category.create(category)
        }
      })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})

