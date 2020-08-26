const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=161837e718ece5874067b4885726d45e&query=" + latitude + "," + longitude + "&units=f";
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the service', undefined);
        } else if (response.body.error) {
            callback('Unable to fetch forcast, Coordinates error', undefined);
        } else {
            const current = response.body.current;
           
            const forecastMsg = current.weather_descriptions + " throughout the day. Current temperature is " + current.temperature + " degree Farhanite. There is " + current.precip + "% chance of rain.";
            callback(undefined, forecastMsg);
        }
    });

}

module.exports = forecast;