 const express = require('express');
 const https = require("https");
 const bodyParser = require("body-parser");
 
 const app = express();

 app.use(bodyParser.urlencoded({extended: true}));
 app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    

     const query = req.body.cityName;
    const apiKey = "0d6244dafd046b78d7ed633831b20439"
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.list[0].main.temp
            const weatherDescription = weatherData.list[0].weather[0].description
            const icon = weatherData.list[0].weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + ".png"

            res.write("<h1>The weather is currently " + weatherDescription + "</h1>")
            res.write("<h1>The temperature in " + query + " is " + temp + "degree Celcius.</h1>")
            res.write("<img src=" + imageURL + ">")

            res.send();
            
            
            console.log(temp)
            // console.log(weatherDescription)
        })
        
    })

 
})




 




 app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
 })