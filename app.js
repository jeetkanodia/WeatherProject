const { log } = require("console");
const express = require("express")
const https = require("https");
const bodyParser = require("body-parser")


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

app.post("/" , (req,res)=>{

    const city = req.body.city;
    const url = "https://api.openweathermap.org/geo/1.0/direct?appid=479b249e1ae6dde22eaf734dcbf81bd0&q=" + city;
    
    

    https.get(url , (response)=>{
        response.on("data" , (data)=>{
            const cityData = JSON.parse(data);
            const long =  cityData[0].lon
            const lat = cityData[0].lat


            const url2 = "https://api.openweathermap.org/data/2.5/weather?appid=479b249e1ae6dde22eaf734dcbf81bd0&units=metric&lat=" + lat+ "&lon=" + long;
            console.log(url2);
            https.get(url2 , (response)=>{
                response.on("data" , (data)=>{
                    const weatherData = JSON.parse(data);
                    const temp = weatherData.main.temp;
                    const des = weatherData.weather[0].description;
                    const icon = weatherData.weather[0].icon;
                    const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                    res.write("<h1> The temperature in "+ city +" is " + temp+" degree Celcius </h1>")
                    res.write("<h1> Description: " + des + "</h1>");
                    res.write("<img src=" + imgurl + ">");
                    res.send();
                })
            }
            )
        })
    })


})






app.listen(3000, ()=>{
    console.log("Server live on port 3000");
})