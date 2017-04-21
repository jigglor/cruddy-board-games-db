// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');
var db = require('./models');

var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');

// your routes here

app.get('/', function(req, res) {
    res.redirect('/games');
});

app.get('/games', function(req, res) {
    db.game.findAll().then(function(games) {
        res.render('games-index', { games: games });
    }).catch(function(err) {
        res.status(404).send(err);
    });
});

app.get('/games/new', function(req, res) {
    res.render('games-new');
});

app.post('/games', function(req, res) {
    db.game.findOrCreate({
        where: {
            name: req.body.name,
        },
        defaults: {
            description: req.body.description,
            numberOfPlayers: req.body.numberOfPlayers
        }
    }).then(function() {
        res.redirect('/games');
    });
});

// show page
app.get('/game/:name', function(req, res) {
    db.game.findAll({
        where: {
            name: req.params.name
        }
    }).spread(function(game) {
        res.render('games-show', { game: game });
    });
});

app.get('/game/:name/edit', function(req, res) {
    db.game.findAll({
        where: {
            name: req.params.name
        }
    }).spread(function(game) {
        res.render('games-edit', { game: game });
    });
});

app.put('/game/:name', function(req, res) {
    db.game.update({
        name: req.body.name,
        description: req.body.description,
        numberOfPlayers: req.body.numberOfPlayers
    }, {
        where: {
            name: req.body.name
        }
    }).spread(function(game) {
        res.render('games-show', { game: game });
    });
});

app.delete('/game/:name', function(req, res) {
    db.game.destroy({
        where: {
            name: req.params.name
        }
    }).then(function(game) {
        res.render('games-show', { game: game });
    });
});


// start the server

var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
