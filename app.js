const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const port = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

app.post('/records', (req, res) => {
  // const name = req.user._id
  console.log(req.body)
  return Record.create({ ...req.body })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/records/new', (req, res) => {
  res.render('new')
})



app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})