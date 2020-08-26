const request = require('postman-request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/ " + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGhhbmEyNSIsImEiOiJja2U0NGxsNzkwcGR5MnNvYmR0YjVza2o5In0.g7FlVROzeJeUbDJFRxq4yA";
    request({ url: url, json: true }, (error, response) => {
        
        if (error) {
            callback('Unable to connect to the service', undefined);
        }else if(response.body.features.length == 0){
            callback('Unable to fetch coordinates, Please check valid address', undefined);
        }else {
            callback("", {
                'latitude': response.body.features[0].center[1],
                'longitude': response.body.features[0].center[0],
                'place_desc': response.body.features[0].place_name,
            });
        }
    });
}

module.exports = geocode;