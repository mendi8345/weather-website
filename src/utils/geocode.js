const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/+='+address+'.json?access_token=pk.eyJ1IjoibWVuZGk4MzQ1IiwiYSI6ImNrNzNkcW55cjBhdnUzaG1uemtrdW9mdDIifQ.4RveUFJS_As8qfpXalN9_A'

    request({ url: url, json: true }, (error, response) => {
        // console.log(response);
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

