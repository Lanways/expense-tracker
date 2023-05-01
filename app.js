const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const port = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})