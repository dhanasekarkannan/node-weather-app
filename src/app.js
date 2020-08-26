const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocoding = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 8000;

//define Paths for express config
const publicStaticPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


//handle bars engines and location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//Setup static directory
app.use(express.static(publicStaticPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Dhanasekar"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {

        title: 'Help',
        name: "Dhanasekar",
        helpMsg: "Please enter the address to fetch weather"
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "Dhanasekar",
        img: '/img/my_profile_pic.jpg',
    })
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please send a valid address in the request"
        });
    }
    geocoding(req.query.address, (error, geocodeData) => {
        if (error) {
            res.send({ error })
        } else {
            forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
                if (error) {
                    res.send({ error })
                } else {
                    res.send({
                        address: req.query.address,
                        forecast: forecastData,
                        location: geocodeData.place_desc,
                        lat: geocodeData.latitude,
                        long: geocodeData.longitude,
                    });
                }
            });
        }
    })

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: "Dhanasekar",
        errorMsg: "Help Article not found"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: "Dhanasekar",
        errorMsg: "Page not found"
    });
});

app.listen(port, () => {
    console.log('server started listening on port ' + port);
});