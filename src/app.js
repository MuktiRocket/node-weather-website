const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
publicDirectoryPath = path.join(__dirname,'../public')
viewsPath = path.join(__dirname,'../templates/views')
partialsPath = path.join(__dirname,'../templates/partials')

//setup handle bar engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:"Jaydeep Sarkar"
    })
})

app.get('/about',(req,res)=>{ 
    res.render('about',{
        title:'About Me',
        name:"Jaydeep Sarkar"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Me',
        name:"Jaydeep Sarkar"
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide a address!"
        })
    }

    geocode(req.query.address,(error,{latitude,langitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(location,(error,forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jaydeep Sarkar',
        errorMessage:'Page Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jaydeep Sarkar',
        errorMessage:'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log('Server is Started on the port ' + port)
})