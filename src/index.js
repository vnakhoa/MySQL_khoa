const express = require('express')
const morgan = require('morgan')
const path = require('path')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
const app = express()
const port = 3000

//database SQL
const dbSQL = require('../src/config_db/connectDB')

// override
app.use(methodOverride('_method'))


// Config View engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));



//Log morgan
app.use(morgan('combined'));

//static file
app.use(express.static(path.join(__dirname, 'public')))


//Cấu hình  (bodyparser và POSTMAN TEST)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.urlencoded({ extended: true }));


//Router (ĐỂ SAU BODY PARSE)
const routing = require('../src/routes/routing')
routing(app)


app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})