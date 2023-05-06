const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const port = process.env.PORT

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    eq: (a, b) => a === b,
    totalAmount: (records) => {
      let total = 0
      records.forEach(record => {
        total += record.amount
      })
      return total
    }
  }
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: 'false',
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  //locals的data所有view都可以存取
  //把req.isAuthenticated()回傳的boolean給res
  res.locals.isAuthenticated = req.isAuthenticated()
  //反序列化 取出的 user給res
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})