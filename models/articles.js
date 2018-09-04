let mongoose = require('mongoose');

// Article Schema
let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

//t's because mongoose looks for the pluralized version of that parameter in your MongoBD database/collection. So if the name of your collection is numbers, the first parameter of the model function has to be 'number'. It also works if the collection's name is something like 'people' and the parameter that you pass in is 'person'.
//
// If this format is not followed, the database entries would not be read.﻿
let Article = module.exports = mongoose.model('Article', articleSchema);