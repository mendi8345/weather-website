const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT|| 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'mendi perlov'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'mendi perlov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'mendi perlov'
    })
})
var data ;
app.get('/weather', (req, res) => {
   
    console.log(req.query.address)
    if (!req.query.address) {
         return res.send({
            erorr:'you most insert an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
         if (error)  {
        return res.send({
            erorr:'error exist on geocode'
        }
        )}
        forecast(latitude,longitude, (error, data) => {
            console.log('Error', error)
            console.log('Data', data)
            res.send({
                forecast: data,
                location: location
            })
        })
    })
})
    //     // console.log('Error', error)
    //         console.log('Data', {latitude,longitude,location})
    // })
    // res.send({
    //     forecast: da,
    //     location: req.query.address
    // })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'mendi perlov',
        errorMessage:'help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'mendi perlov',
        errorMessage:'not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port .'+port)
})