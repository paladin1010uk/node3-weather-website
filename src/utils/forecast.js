const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=094b07043fa87199692db3439a4a8c16&query=' + longitude + ',' + latitude

    request({url, json: true}, (error, {body} = response) => {

        if (error) {
            console.log('Cannot connect')
        } else if (body.error) {
            callback('Error: ' + body.error.code + ' (' + body.error.info + ')',undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions,
                temperature: body.current.temperature,
                precip: body.current.precip,
                pressure: body.current.pressure,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast
