const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiamF5ZGVlcHM5NnMiLCJhIjoiY2t2dzkxN3VsMDYyODJ1bjAwM3c1NjllbSJ9.QUpCTfDR8vyzgWwFztqN-g'
    request({url: url,json:true,},(error,response)=>{
        if(error){
            callback('Seems like the app is having some issues',undefined)
        }
        else if(response.body.message === 'Forbidden' || response.body.message === 'Not Found' || response.body.features.length === 0){
            callback('Unable to find the Location, please try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })

        }
    })
}

module.exports = geocode