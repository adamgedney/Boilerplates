var express     = require('express');
var http        = require('http');
var fs          = require('fs');
var path        = require('path');

//Export app to project
var app = module.exports = express();


//Enables body parser for POST form data handling with req.body.
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded());








//The consolidate view engine adapter module
//Setup to use handlebars
var cons = require('consolidate');

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');

//Tell Express to use public folder
app.use(express.static(path.join(__dirname, 'public')));

















//=================================//
//Controller requires
//=================================//
fs.readdirSync('./controllers').forEach(function(file){
    if(file.substr(-3) == '.js'){
        var route = require('./controllers/' + file);
        route.controller(app);
    }
});





//Set up listening port as per app.set
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

































