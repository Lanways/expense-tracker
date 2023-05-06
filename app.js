const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')

require('./config/mongoose')

const PORT = process.env.PORT

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
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})