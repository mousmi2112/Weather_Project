 const express=require("express");
 const https=require("https");
const bodyParser = require("body-parser");
 

 const app=express();
 app.use(bodyParser.urlencoded({extended: true}));

 app.get("/",function(req,res){
    
  res.sendFile(__dirname+"/index.html");
 });

 app.post("/",function(req,res)
 {
    
     const q=req.body.cityName;
    const appid="f7c1d5516cf3ed2e7968a07e02a96bb9";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+ q + "&appid=" + appid ;
 https.get(url,function(response){
     console.log(response.statusCode);

     response.on("data",function(data)
     {
         const weather_data=JSON.parse(data);
         const temp=weather_data.weather[0].description;
         const icon=weather_data.weather[0].icon;
         const imageURL="http://openweathermap.org/img/wn/" +icon + "@2x.png";
         res.write("<h1>The weather in "+ q +" is " + temp +"</h1>");
         res.write("<img src=" + imageURL + ">");
     })
 })
     
 })

 
 

 app.listen(3000,function(){
     console.log("Server is running on port 3000");
 })