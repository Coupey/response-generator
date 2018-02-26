const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const churchill = require('churchill');
const logger = require('./lib/logger');

var app = express();
app.use(churchill(logger));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  signed: false
}));
function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.use('/', nocache, require('./api')());

var server = http.createServer(app);
server.listen(process.env.PORT || 8001, function() {
  var addr = server.address();
  logger.info('Listening on %j', addr);
});
