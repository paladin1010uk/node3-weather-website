const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFsYWRpbjEwMTB1ayIsImEiOiJja3ZkcHloanoweWpyMm9xbmVydXJ2dnh3In0.DhvWQ1BCvt-2Xes7T7HTgw&limit=1'

    request({url, json: true}, (error,{body} ) => {
        if (error) {
            callback('Cannot connect',undefined)
        } else if (body.features.length === 0 ) {
            callback('Cannot find location', undefined)
        } else {
            callback(undefined, {
                latitude:  body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
             })
        }
    })
}

module.exports = geocode
