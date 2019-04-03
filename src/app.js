const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode'); // contains a function to get geo location
const weather = require('./utils/weather'); // contains a function to get weather location

const app = express();

// paths used to configure express
const public_dir = path.join(__dirname, '../public');
const views_dir = path.join(__dirname, '../templates/views');
const partials_dir = path.join(__dirname, '../templates/partials');

// set config parameters for express app
app.set('view engine', 'hbs'); // sets template engine as hbs
app.set('views', views_dir); // sets default dir for views

hbs.registerPartials(partials_dir);
app.use(express.static(public_dir)); // sets the default path for the static response files

// home page route
app.get('/', (req, res) => {
    res.render('index',{
        title: 'Welcome to Weather app !'
    });
});

// about page route
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me !',
        name: 'Sushilkumar Takkekar',
        age: 23
    });
});

// weather page route
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Invalid address ! No such place exists.'
        });
    }
    const mapbox_token = 'pk.eyJ1Ijoic3VzaGlsLXRha2tla2FyIiwiYSI6ImNqdHNiOW9ydTB2eHk0NHBjeW5rZHhzZHIifQ.wpq8tuCgPge32KcWR6IM-Q';
    const darksky_token = '181b6162f2543aeb9e11517d58cbb84a';
    geocode.getGeoCode(mapbox_token, req.query.address, (err, data) => {
        if(err) {
            return res.send({
                error: err
            });
        }else {
            // get weather of a place
            weather.getWeather(darksky_token, data.lat, data.long, (err_darksky, result) => {
                if(err_darksky) {
                    return res.send({
                        error: err_darksky
                    });
                }else {
                    return res.send({
                        location : req.query.address.trim(),
                        temperature: result.currently.temperature,
                        rainProbability: result.currently.precipProbability
                    });
                    //console.log('It is currently '+result.currently.temperature+' degrees out there in '+req.query.address.trim()+'. There is a '+result.currently.precipProbability+'% chance of rain.');
                }
            });
        }
    });
    // Ens of GeoCode function call
});

// route inside '/about' not found
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found :(',
        errormsg: 'No info exists about user "'+req.originalUrl.substring(7)+'"'
    });
});

// 404 page route
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found :(',
        errormsg: 'Something is wrong !'
    });
});

// start a web-server
app.listen(3000,() => {
    console.log('Web-server started at port 3000..');
})