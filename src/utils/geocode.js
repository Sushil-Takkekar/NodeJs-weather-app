const request = require('request');

// function to get geo location
const getGeoCode = (token, searchAddress, callback) => {
    if(searchAddress === undefined || searchAddress.trim() == '') {
        callback('Error - Please provide valid address to search !', undefined);
    }else {
        searchAddress = searchAddress.trim();
        const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+searchAddress+'.json?access_token='+token+'&limit=1';
        // make a request to mapbox.com
        request.get({ url: mapbox_url, json: true }, (err, data) => {
            if(err) {
                callback('Error - Server unreachable !', undefined);
            }else if(data.body.message) {
                callback('Error from mapbox server: '+data.body.message, undefined);
            }else if(data.body.features.length < 1) {
                callback('Error from mapbox server: Place not found !', undefined);
            }else {
                let res = {};
                res.lat = data.body.features[0].center[1];
                res.long = data.body.features[0].center[0];
                callback(undefined, res);
            }
        });
    }
}

module.exports = {
    getGeoCode
}