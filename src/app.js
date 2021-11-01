const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//define paths and static directory
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Paul Krisman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Paul Krisman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Paul Krisman',
        helpMessage: 'This is how it works'
    })
})


app.get('/weather', (req,res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You have not provided an address'
        })
    }

    geocode (address, (error,{longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, {temperature, description, precip} = {} ) => {
            if (error) {
                return res.send(error)
            }

            res.send({
                address: address,
                location: location,
                forecast: {
                    temperature,
                    description,
                    precip
                }
            })
          })
    })


})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('notfound', {
        title: 'Help articles',
        name: 'Paul Krisman',
        errorMessage: 'Help article has not been found'
    })
})

app.get('*', (req,res) => {
    res.render('notfound', {
        title: '404 Error',
        name: 'Paul Krisman',
        errorMessage: 'There has been a 404 error'
    })
})

app.listen(port, () => {
    console.log('Server is up at port ' + port)
})
