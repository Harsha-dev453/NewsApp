var path = require("path");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();    
});
app.use(express.static(path.join(__dirname, "/build"),{
}));

app.get('/*', function(req, res, next){ 
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next(); 
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

module.exports = app;