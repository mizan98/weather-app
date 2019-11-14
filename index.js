const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express') 
const app = express()
const getWeather = require('./lib/getWeather')

app.use(express.static(path.join(__dirname, 'public')))   //__dirname is the full path of the repository
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

app.get('/', (req, res) =>{
    res.render('index')
})


app.post('/', async(req, res) => { 
    let location = req.body.location
    let countryCode = req.body.country
    let data = await getWeather(location, countryCode)

    let temp = data.main.temp
    let humidity = data.main.humidity 
    let description = data.weather[0].description

    res.render('index', {data: {temp, humidity, description, location, countryCode}}) 
})


app.listen(3000, () =>{     //tells the express to open on port 3000
    console.log('server listening on port 3000')
    console.log(__dirname)
})

//express is a software based web server

//line 1: import express
//line 2: initialize express
//line 4: defines what page working on
//line 5: what us sent back to the user from request
//line 10: telling express what port to listen on

