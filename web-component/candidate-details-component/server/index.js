var swStats = require('swagger-stats');
var http = require('http');
var express = require('express');
var path = require('path');
var auth = require('./auth/auth');
var logger = require('log4js').getLogger();
let healthyRoute = require('./healthy');

logger.level = 'debug';
var app = express();

// Unsecured API calls
app.use(healthyRoute);
app.use('/token.js', function(req, res) {
    auth.getCallCenterOAuthToken(function(err, data) {
        if (err) {
            throw err;
        }
        res.sendFile(path.join(__dirname, '../token.js'));
    });
});

app.use(express.static(path.join(__dirname, '../storybook-static/')));

app.use(swStats.getMiddleware({}));

http.createServer(app).listen(8080);
logger.debug('Node app started on port 8080');
