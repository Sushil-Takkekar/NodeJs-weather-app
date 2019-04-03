const request = require('request');

// function to get the weather details
const getWeather = (token, lat, long, callback) => {
    var darksky_url = 'https://api.darksky.net/forecast/'+token+'/'+lat+','+long;
    // make a request to darksky.net
    request.get({ url: darksky_url, json: true }, (err, data) => {
        if(err) {
            callback('Error - Server unreachable !', undefined);
        }else if(data.statusCode === 403) {
            callback('Error - Forbidden ('+data.statusCode+')', undefined);
        }else if(data.statusCode === 401) {
            callback('Error - Permission denied ('+data.statusCode+')', undefined);
        }else if(data.body.error) {
            callback('Error - '+data.body.error, undefined);
        }else {
            callback(undefined, data.body);
        }
    });
}

module.exports = {
    getWeather
}