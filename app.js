var express = require('express');
var mongo = require('mongodb').MongoClient;

var app = express();

app.get('/', (req, res) => {

});

app.listen(port, '127.0.0.1', () => {
    console.log("Connection to server on port 3000 alive!");
})