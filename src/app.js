const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Paths
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlers
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirPath));

app.get('',(req, res) => {
    res.render('index',{
        title : 'Weather',
        name: 'Avinash'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name:'avinash'
    });
});

app.get('/help', (req, res) => {
    res.render('about',{
        title: 'Help regarding the app',
        name:'avinash'
    });
});

app.get('/help/*',(req,res) => {
    res.render('404', {
        title : "Oooops..",
        name : 'avinash',
        errorMsg : "Help Page not Found"
    })
})

app.get('/weather',(req,res) => {
    const address = req.query.address;
    if(!address){
       return res.send({
           message: "address required"
        })
    }
    console.log('weather here')
    geocode(address,(error,{latitude,longitude}={}) => {
        console.log('gecdoe',error)
        if(error){
           console.log('error caught in gecode returned error');
            return res.send({error})
       } 

        forecast(latitude,longitude,(error,data) => {
            if(error){
                return res.send({error})
            }

            return res.send({
                forecast : data,
                address: address

            })
        })
    })    
})

app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send("serach required")
    }
    
    res.send({
        products : "Help Page not Found"
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title    : "Oooops..",
        name     : 'avinash',
        errorMsg : "xpage not found"
    })
})

app.listen(port, (req, res) => {
    console.log('Server started on:' + port);
})
