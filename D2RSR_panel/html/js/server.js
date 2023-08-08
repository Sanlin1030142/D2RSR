var express = require('express');
var request = require('request');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/stream', function (req, res) {
  var url = 'http://192.168.0.21:8082' + req.url;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  });
});

app.listen(8081);
