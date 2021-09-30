const express = require('express')
const path = require('path')
const app = express()

const bodyParser = require('body-parser'); 



const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))



const indexRouter = require('./routes/index')


app.use('/', indexRouter)


const hostname = 'localhost'
const PORT = process.env.PORT || 3001
  app.listen(PORT, () =>{
    
    console.log(`Server running at http://${hostname}:${PORT}`)
})