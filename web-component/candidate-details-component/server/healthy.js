/**
 * Healthcheck Route
 *
 * Description: This route is used to build a healthcheck for the application.  The returned healthcheck
 * is a JSON document that has the following format.
 *
 * {
 *   "status": "string",
 *  }
 *
 * status (string): The overall status of the system. Possible values are "healthy" or "not-healthy".
 * timestamp (string): The date and time of the health check request in the format DDD, DD MMM YYYY HH:MM:SS (e.g. Fri, 16 Oct 2015 15:59:23 -0400) ,
 * hostname (string): The hostname of the server being tested ,
 * executionTime (integer): The time (in millis) that it took for the health check request to complete ,
 * components (Array) : An array of  objects that represent components that were tested
 *
 */
'use strict';
let express = require('express');
let router = express.Router();
router.get('/health', function(req, res){
    let healthcheck =  {};
    healthcheck.status = 200;
    console.log(healthcheck);
    res.json(healthcheck);
});

module.exports = router;
