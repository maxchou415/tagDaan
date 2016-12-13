var http = require('http')
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var FB = require('fb')
var cors = require('cors');


var app = express();
var server = http.createServer(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

server.listen(8000, '0.0.0.0', function() {
  console.log('Ready on http://localhost:8000');
}); //Run Server On port 8080


app.get('/', function(req, res) {
  res.render('index.ejs', {
    title: 'tag 大安' // Insert Your Facebook Page Name
  });
});

//Post Page
app.route('/add')
  .post(function(req, res, next) {
    var message = req.param('message');
    var response = {};
    FB.setAccessToken(''); 
    FB.api('1719895818338836/feed', 'post', {
      message: message
    }, function(res) {
      if (!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
      }
      console.log('Post Id: ' + res.id);
    });

    if (res.id == 0) {
      response = ({"message" : "failed"});
    } else {
      var id = res.id;
      response = ({"message" : "success", "id" : id});

    }


    res.json(response);

  })
//Error Page
app.use(function(req, res) {
  res.send("404: Page not Found", 404);
});
