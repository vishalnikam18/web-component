var express = require('express');
var app = express();
const auth = require('./auth/auth');
let healthyRoute = require('./healthy');
// Unsecured API calls
app.use(healthyRoute);
auth.getCallCenterOAuthToken(function(err,data){
    if(err){
        throw err;
    }
    console.log(data);
});