const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
const session = require('express-session')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const port = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: 'false',
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

usePassport(app)
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})