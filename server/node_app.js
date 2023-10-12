var path = require("path");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const {predict} = require('./discountGen/discountGen');


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

app.get('/api/myroute', async (req, res)=>{
  try {
    const result = await predict(); // Call your async controller function here
    res.status(200).json(result); // Send the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});



app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

module.exports = app;