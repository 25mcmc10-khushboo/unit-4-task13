import React, { useState } from "react";
import "./Weather.css";
import axios from "axios"
function Weather(){

const [city,setCity]=useState("");
const [weather,setWeather]=useState(null);
const [forecast,setForecast]=useState([]);
const [error,setError]=useState("");

const API_KEY="3130959124f690f72549ea788adb1899";

const fetchWeather=async()=>{

if(city===""){
setError("Enter city name");
return;
}

try{

const response = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);

const data = response.data;

if(data.cod!==200){
setError("City not found");
setWeather(null);
setForecast([]);
return;
}

setWeather(data);
setError("");

fetchForecast();

}catch{
setError("Error fetching data");
}

};


const fetchForecast=async()=>{

const response = await axios.get(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
);

const data = response.data;

const nextDays=[
data.list[8],
data.list[16],
data.list[24],
data.list[32],
data.list[39]
];

setForecast(nextDays);

};


return(

<div style={{textAlign:"center"}}>

<h2>Weather App</h2>

<input
type="text"
placeholder="Enter city"
value={city}
onChange={(e)=>setCity(e.target.value)}
/>

<button onClick={fetchWeather}>Search</button>

{error && <p>{error}</p>}

{weather && (

<div>

<h3>{weather.name}</h3>

<p>Temperature: {weather.main.temp} °C</p>
<p>Humidity: {weather.main.humidity}%</p>
<p>Condition: {weather.weather[0].main} sky</p>

</div>

)}

{forecast.length>0 &&(

<div>

<h3>Next 5 Days Weather</h3>

{forecast.map((item,index)=>{

const date=new Date(item.dt_txt);

return(

<div className="forecast-card" key={index}>

<h4>{date.toDateString()}</h4>
<img
src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
alt="icon"
/>
<p>Temperature: {item.main.temp} °C</p>
<p>Humidity: {item.main.humidity}%</p>
<p>Condition: {item.weather[0].main} sky</p>

</div>

);

})}

</div>

)}

</div>

);

}

export default Weather;