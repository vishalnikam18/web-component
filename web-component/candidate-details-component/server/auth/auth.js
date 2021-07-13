const httpClient = require('request-promise');
const fs = require('fs');
var logger = require('log4js').getLogger();
let genaretedTS;

function isTokenExpaired(genaretedTS) {
    // return false;
    return genaretedTS < new Date().getTime();
}

exports.getCallCenterOAuthToken = function (callback) {
    if (!genaretedTS || isTokenExpaired(genaretedTS)) {
        const options = {
            uri: 'https://api-staging.travelclick.com/oauth/token?grant_type=client_credentials',
            headers: {
                Authorization: 'Basic bDd4eDQzNGMwNzMwNWM0NzQzNGI4MGU2MDY3MTM0NTFjNzU0OmYwOTQ2OTdiOWVmNjQ1ZmZiZjMwYmQxYjNiYWQ1ZTM3',
            },
            body: {},
            json: true,
            method: 'POST',
        };
        httpClient(options)
            .then(function (response) {
                logger.debug('Successfully fetched  OAuth Token API');
                logger.debug(response.access_token);
                let token = response.access_token;
                genaretedTS = new Date().getTime() + (response.expires_in - 120) * 1000;
                fs.writeFileSync('token.js', 'window.token = "' + token + '"');
                callback(null,{status:"ok"})
            })
            .catch(function (error) {
                logger.error('error while calling  OAuth Token API');
                callback(error,{status:"failed"})
                // next();
            });
    }else {
        callback(null,{status:"ok"});
    }
};
