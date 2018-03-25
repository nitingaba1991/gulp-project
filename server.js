var express = require('express');
var app = module.exports = express();
var path = require('path');
//var MongoStore = require('connect-mongo')(session);
//var mongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/nodeapp';
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// mongoClient.connect(url, function (err, db) {
//     console.log("Connected correctly to server");
// //    db.close();
// })
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//require('./app/sendmail')(app);
//require('./app/model')(app);
process.on('uncaughtException', function (err) {
    console.log(err);
})
var port = process.env.PORT || 9001;
console.log(path.join(__dirname, 'assets'),__dirname)
app.use(express.static(path.join(__dirname, 'assets')));
app.use(function (req, res) {
    res.sendfile(path.join(__dirname, 'index.html'));
});

// Set server port``    4T6789642 GRVFCM<z,X
app.listen(port);
console.log('server is running on port ', port);
exports = module.exports = app; // expose app