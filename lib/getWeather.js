const request = require('request');
const {promisify} = require('util')
const promisifiedRequest = promisify(request)   

const getWeather = async (location, countryCode) => {
    let data = await promisifiedRequest({       
        uri: `https://api.openweathermap.org/data/2.5/find?q=${location},${countryCode}&units=metric&APPID=${process.env.APPID}`,  
        json: true                  
    }); 
    return data.body;
}
module.exports = getWeather;