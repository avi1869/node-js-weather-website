const request = require('request');

const geocode = (address,callback) => {
    const mapCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFwcGluZ3Rlc3Q0MzU0IiwiYSI6ImNrbmt6dWc5djBkcGQyb3A5bzMyZTI4bHkifQ.3KGS3rwWFsAI9x-pp13nBQ&limit=1';
    request({ uri: mapCodeUrl, json: true}, (error,{body}) => {
        if(error){
            callback('unable to connect', undefined);
        }else if(body.error){
            callback("response Body Error",undefined);
        }else if(body.features.length === 0){
            callback('no location',undefined);
        }else{
            const Longigtude=body.features[0].center[0];
            const Latitude=body.features[0].center[1];
     
            callback(undefined,{
                latitude:Latitude,
                longigtude:Longigtude
            });
        }
    })
};

// geocode('New York',(error, data) => {
//     //console.log(data[0],data[1]);
//     getWeaterInfo(data[0],data[1],(error,data) =>{
//         console.log(error);
//         console.log(data);
//     })
// });




module.exports = geocode ;