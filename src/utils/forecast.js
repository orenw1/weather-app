const request = require('request')

const forecast = (long, lat, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4bb0a5e684ed95110f79ba4234d3af45&query=' + long + ',' + lat + '&units=f'
    console.log(`url = ${url}`);
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')

        } else if (body.error) {
            callback('Unable to find location');
        } else {
            data = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}.`    
            data += ' The humidity is ' + body.current.humidity + '%'
            callback(undefined, data);
        }
    })

}

module.exports = forecast
