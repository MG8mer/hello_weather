/*
Below code partially from 
1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. My Dad :)
*/
const APIKey = "ed0e35b9304aa2a810b22c9bc7a56b60"
var city = "New York";
var Data;
async function logJSONData(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    Data = jsonData;
    console.log(Data);

    document.getElementById("location").innerHTML = Data["name"];
   document.getElementById("place").innerHTML = Data["sys"]["country"];
   document.getElementById("condition").innerHTML = Data["weather"][0]["description"]; //Syntax to pull "description" element from "weather" array from ChatGPT.
    document.getElementById("temp").innerHTML = "Temp: " + Math.round(Number(Data['main']['temp']-273.15));
    document.getElementById("feelsLike").innerHTML = "Feels Like: " + Math.round(Number(Data['main']['feels_like'])-273.15); 
    document.getElementById("wind").innerHTML = "Wind Speed: " + Number(Data["wind"]["speed"]) + "m/s";
}
/*
Above code partially from 
1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. My Dad :)
*/

// Below code from ChatGPT https://chat.openai.com/
function interactiveWeatherQurty(event) {
    event.preventDefault();
    const weatherQuery = document.getElementById
    ("weatherQuery");
    const city = weatherQuery.value.trim();
    if (city !== "") {
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    logJSONData(queryURL)
    }
}
const formCity = document.getElementById("formCity");
formCity.addEventListener("submit", interactiveWeatherQurty);
// Above code from ChatGPT https://chat.openai.com/





