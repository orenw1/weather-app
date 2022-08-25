const request = require('request')

// Geocoding
//Address -> Lat/Long -> Weather
// const geocodeAccessToken = 'pk.eyJ1Ijoib3JlbncxMjMiLCJhIjoiY2w2eHgyaWV5MDU3ajNlbXhnNWw4MnNpbyJ9.vCJV5FEcMGg5S9O-JZfN_Q'

// //https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoib3JlbncxMjMiLCJhIjoiY2w2eHgyaWV5MDU3ajNlbXhnNWw4MnNpbyJ9.vCJV5FEcMGg5S9O-JZfN_Q&limit=1
// //const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=' + geocodeAccessToken + '&limit=1'
// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/123www.json?access_token=' + geocodeAccessToken + '&limit=1'


const geocode = (address, callback) => {
    const geocodeAccessToken = 'pk.eyJ1Ijoib3JlbncxMjMiLCJhIjoiY2w2eHgyaWV5MDU3ajNlbXhnNWw4MnNpbyJ9.vCJV5FEcMGg5S9O-JZfN_Q'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + geocodeAccessToken + '&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to gecoding service!') // data is undefined if not sent
        } else if (body.features.length === 0) {
            callback('Failed to find geo location. Try another search')
        } else {
            const data = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                place: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })

}

module.exports = geocode