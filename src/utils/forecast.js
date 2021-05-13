const request = require('request');

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=d8b614a1db3e0c5da09b695a17ccd5d5&query=' + latitude + ',' + longitude;
    request( {uri: url, json: true} , (error, {body})=>{
        if(error){
            callback('conn error', undefined); // Print the error if one occurred
        }else if(body.error){
            callback('info not found for location',undefined);
        }else{
            callback(undefined,'temperature:' + body.current.temperature );
        }
    })
}

module.exports = forecast;