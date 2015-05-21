var express     = require('express');
var http        = require('http');
var geohash     = require('ngeohash');

var app = express();

process.setMaxListeners(0);
app.configure(function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.set('port', 8080);

app.use(app.router);

// route
var matching = {};
app.get('/match/:user/:lat/:lon', function(req, res, next) {
   var ghash = geohash.encode(parseFloat(req.params.lat), parseFloat(req.params.lon));
   var ghash_6 = ghash.substr(0,6);
   if (!(ghash_6 in matching)) {
      matching[ghash_6] = [];
   } 
   matching[ghash_6].push(req.params.user);
   console.log(matching);
   res.end(JSON.stringify(matching));
});

// start server
http.createServer(app).listen(app.get('port'), function(err) {
    console.log('start server '+app.get('port'));
});

// EOF
