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
            mongo.connect(dbUrl, (err, db) => {
                if (err) {
                    res.json(images);
                } else {
                    var imageSearchList = db.collection('imageSearchList');
                    imageSearchList.insert({term: imageName, when: date}, () => {
                        db.close();
                        res.json(images);
                    });
                }
            })
        } else {
            res.send("Something just went nuts! Come when i have checked it out");
        }
    })
});

app.get('/api/latest/imageSearch', (req, res) => {
    mongo.connect(dbUrl, (err, db) => {
        var imageSearchList = db.collection('imageSearchList');
        imageSearchList.find({}, {_id: 0}).sort({_id: -1}).limit(10).toArray((err, docs) => {
            if (err) {
                db.close();
                res.send("Something just went nuts! Come back when i have checked it out");
            } else {
                db.close();
                res.json(docs);
            }
        });
    });
});

app.get('*', (req, res) => {
    res.send(req.headers);
});

app.listen(port, '127.0.0.1', () => {
    console.log("Connection to server on port 3000 alive!");
});