var express = require('express');
var morgan = require('morgan');
var request = require('request')
var axios = require('axios');

var app = express();

var cache = {
     url: null,
     data: null
}

app.use(morgan('dev'));

app.get('/', function (req, res) {

    if (cache.url === req.url) res.send(cache.data);
    
    else {
        axios.get('http://www.omdbapi.com'+ req.url +'&apikey=8730e0e')
        .then(function (response) {
            cache.url = req.url
            cache.data = response.data;
            res.status(200).json(response.data);
        })
        .catch(function (error) {
            res.status(200).json(error.message);
        });
    }
});

// else just res.send something like ('you suck')



module.exports = app;