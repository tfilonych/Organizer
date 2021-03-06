var express = require("express");

var env = process.env.Node_ENV = process.env.Node_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];


require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.port);
console.log('Listening on a port ' + config.port);
