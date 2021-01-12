const twitter = require('./twitter.js');
var express = require('express');
var bodyParser = require('body-parser');
const { body,validationResult } = require('express-validator')

var app = express();

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());


app.post('/tweet', (req, res) => {
   tweet = String(req.body.query)
   twitter.send_tweet(tweet)
   res.send('send tweet ')

 })

app.get('/', (req, res) => {
   res.render('index.html')
 })
 
 app.listen(8080, () => {
   console.log(`Example app listening at http://localhost:8080`)
 })