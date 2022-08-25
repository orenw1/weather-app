const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express()
// for Heroku with default 3000
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // use handlebars as template engine
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

// use the handlebars template for index.html
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Oren'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Oren'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        message: 'This is an help message',
        name: 'Oren'

    })
})


app.get('/weather',(req,res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter adress to search for'
        })
    }


    geocode(req.query.address, (error, {lat, long, place} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

         console.log('Error: ', error);
         console.log('lat: ', lat);
         console.log('long: ', long);
         console.log('place: ', place);

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ 
                    error
                })
            }

            console.log(place);
            console.log(forecastData);
            res.send({
                forecast: forecastData,
                place: place,
                address: req.query.address
            })
        })

    })

   
})

app.get('/products', (req,res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a searh term'
        })
        
    }
    console.log(req.query)

    res.send( {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    const data = {
        title: 'Help',
        name: 'Oren',
        message: 'Help articale not found!'

    }
    res.render('error404', data)
})


app.get('*', (req, res) => {
    const data = {
        title: 'Page not found!',
        name: 'Oren',
        message: 'Page not found!'

    }
    res.render('error404', data)
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
})