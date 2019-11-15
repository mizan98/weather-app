const {Router} = require('express');                       //express allows us to add logic to each component 
const router = Router();

const getWeather = require('../lib/getWeather');

router.get('/', (req, res) => {

    let query = req.query.location;
    console.log(query)
    res.render('index');
})


router.post('/', async (req, res) => {                       //.post to send information to a page on server
    let location = req.body.location
    let countryCode = req.body.country
    let data = await getWeather(location, countryCode)
    res.render('index')
})

router.get('/signup', (req, res) =>{ 
    if(userSignedIn()) {
        res.redirect('/profile')
    }                                                 //.get to specify what page to bring up when entered in address bar
    res.render('signup')
})

router.get('/profile', (req, res) => {
    if(userSignedIn()) {
        res.render('/profile')
    } else{
        res.redirect('/signup')
    }
})
module.exports = router