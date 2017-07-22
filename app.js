var express = require('express');
var mongo = require('mongodb').MongoClient;
var dbUrl = "mongodb://eml:eml2019@ds029824.mlab.com:29824/urls";
var googleImages = require('google-images');
var apiKey = 'AIzaSyBD4Tx11uecQCLwMpiAZh9Xwej_9BugwQw';
var cseId = '014775270986064071891:xi06qa5dhiu';
var client = googleImages(cseId, apiKey);

//Port
var port = process.env.PORT || 3000;

var app = express();

//Static files Middleware
app.use(express.static('public'));

app.get('/api/imageSearch/:name', (req, res) => {
    var page = req.query.offset ? req.query.offset : 1;
    var imageName = req.params.name;
    var date = new Date().toISOString();
    client.search(imageName, {
        page: page
    }).then((images) => {
        if (images.length > 0) {
            mongo.connect()
        }
    })
});


app.listen(port, '127.0.0.1', () => {
    console.log("Connection to server on port 3000 alive!");
});