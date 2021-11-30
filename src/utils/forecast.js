const request = require('request')

const forecast = (country,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3154caf45c5595dfafcf79db0f7e46d7&query='+country 
    request({ url:url, json:true},(error,response)=>{
            if(error){
               callback('Seems like the app is having some issues',undefined)
            }
            else if(response.body.error === 0){
                callback('Unable to find the location',undefined)
            }
            else{
                callback(undefined,'The current temperature is '+response.body.current.temperature+' degree centigrade and the rate of precipitation is '+response.body.current.precip+'%')
            }
        })
}
module.exports = forecast