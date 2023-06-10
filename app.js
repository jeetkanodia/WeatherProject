const express = require("express")
const https = require("https");


const app = express();

app.get("/" , (req, res)=>{

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=17.3850&units=metric&lon=78.4867&appid=bd5e378503939ddaee76f12ad7a97608";

    https.get(url , (response)=>{
        response.on("data" , (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1> The temperature in Hyderabad is " + temp+" degree Celcius </h1>")
            res.write("<h1> Description: " + des + "</h1>");
            res.write("<img src=" + imgurl + ">");
            res.send();
        })
    })


})

app.listen(3000, ()=>{
    console.log("Server live on port 3000");
})