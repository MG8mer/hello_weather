/*
Below code from 
1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. My Dad :)
*/
var Data;
async function logJSONData(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    Data = jsonData;
    document.getElementById("temp").innerHTML = "Temp " + Number(Data['main']['temp']-273.15);
    document.getElementById("output").innerHTML = "Feels Like " + Number(Data['main']['feels_like']-273.15);
}

const APIKey = "ed0e35b9304aa2a810b22c9bc7a56b60"


var city = "amman";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
logJSONData(queryURL);
/*
Above code from 
1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. My Dad :)
*/
