var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var dbConfig = require('./db');
var mongoose = require('mongoose');
var router = express.Router();
var passport = require('passport');

//init packages
mongoose.connect(dbConfig.url);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));

//add route
var routes = require('./routes')(router);
app.use('/api', routes);
//handle missing routes
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send(err);
});

// Start server
app.listen(port);
console.log('Running on port ' + port);
