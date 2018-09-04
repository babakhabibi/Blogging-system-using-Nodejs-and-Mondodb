const express = require('express');

const path = require('path');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;
// Check connection
db.once('open', () => {
    console.log('connected to mongo db')
});
// Check for DB errors
db.on('error', (err) => {
    console.log('err')
});

// Init App
const app = express();

// Bring in models
let Article = require('./models/articles');


// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
// Home Route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err)
        } else {


        }
        res.render('index', {
            title: 'articles',
            articles: articles
        });
    });

});
app.get('/', (req, res) => res.send('Hello World!'));


// Add route article
app.get('/articles/add', (req, res) => {
    res.render('add_articles', {
        title: 'Add Article'
    })
});
//Add submit POST Route
app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }

    });
});

// Start server
app.listen(3000, () => {
    console.log('I can hear you');
});