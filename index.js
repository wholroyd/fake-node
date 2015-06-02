var express = require('express');
var exphbs  = require('express-handlebars');
var unirest = require('unirest');

var app = express();

var hbs = exphbs.create({
    extname:        '.hbs',
    defaultLayout:  'main'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    
    unirest.get("https://community-open-weather-map.p.mashape.com/weather?callback=test&lang=en&q=Raleigh%2Cnc&units=imperial")
        .header("X-Mashape-Key", "omMqOkFCnemshvziXVVibLN4dB0Xp11SSy6jsncG0DB5q3czW6")
        .header("Accept", "application/json")
        .end(function (result) {
            res.render('home', { 
                title: 'Fake App',
                data: eval(result.body)
            });
        });
});

function test(data)
{
    return JSON.stringify(data, null, 4);   
}

app.listen(80);