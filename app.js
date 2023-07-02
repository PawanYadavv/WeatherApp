require('dotenv').config();
const apiKey= process.env.API_KEY;
// console.log(apiKey);
const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res) {    
    res.sendFile(__dirname + "/index.html") 
    
});

app.post("/",function(req,res) {
    const query = req.body.cityName;
    // const apiKey = "90510e536c780a6b7fd2227490fcc934";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
        https.get(url,function(response) {
            console.log(response.statusCode);
            // now to fetching data from api response.on is used
            response.on("data", function(data) {
                     const Weatherdata = JSON.parse(data);

                   const temp = Weatherdata.main.temp;
                    const WeatherDescription = Weatherdata.weather[0].description;
                    const icon = Weatherdata.weather[0].icon;   
                    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                    res.write("<p>The Weather is currrently " + WeatherDescription + "<p>"); 
                    res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius.</h1>");                    
                    res.write("<img src=" + imageURL +">");

                              res.send();  

            });
        }); 
});



app.listen(process.env.PORT || 3000,function() {
    console.log("Server is Running on port 3000");
});







