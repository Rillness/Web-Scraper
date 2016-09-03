var express = require('express');
var app = express();
var watson = require('watson-developer-cloud');

//Enter an API key to use Alchemy language.
var alchemy_language = watson.alchemy_language({
  api_key: 'ENTER YOUR API KEY.'
});

//Setup view engine with ejs.
app.set('view engine', 'ejs');

//Gets the home page.
app.get('/', function(req,res){
  res.render('index');
});

//This is the page, that comes after a query is searched.
app.get('/new', function(req,res){
  var webQuery = req.query.website;

//Parameters for IBM's alchemy request.
  var parameters = {
    url : webQuery
  };

//IBM's alchemy request.
  alchemy_language.text(parameters, function (err, response) {
    if (err){
      console.log('error:', err);

//If there is an error, it will redirect you to the home page.
      res.redirect('/');
    }else{

    //Gets you the Websites Text.
  var text = response.text;
    //Gets you the URL for the Website Alchemy just scraped.
  var url = response.url;

//Render the index file.
    res.render('index2', {text : text, url : url});

     }

  });

});


app.listen('3000', function(){
  console.log('Listening on Port 3000');
});
