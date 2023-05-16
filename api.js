/*
Below code partially from 
1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_prompt1
4. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
5. My Dad :)
*/


const APIKey = "ed0e35b9304aa2a810b22c9bc7a56b60"
// Below code inspired by: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
var watchID;
var geoData;
async function getPositionSuccess(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    navigator.geolocation.clearWatch(watchID)
    document.getElementById('lat').innerHTML = lat;
    document.getElementById('long').innerHTML = long;
  
// Below code from ChatGPT https://chat.openai.com *BUT* has been slightly modified by myself.
const apiKEY = '161a25f78acb4ba295beb5b75f8d77c2';
const geocodingAPI = "https://api.geoapify.com/v1/geocode/reverse?lat=" + lat +"&lon=" + long +"&apiKey=" + apiKEY;

// Below code partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys & https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch,
const response = await fetch(geocodingAPI);
const jsonData = await response.json();
geoData = jsonData;
console.log(geoData);
// Above code partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys & https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch,

// Below code from ChatGPT https://chat.openai.com.
const geoCity = geoData.features[0].properties.state;
document.getElementById('geoCity').innerHTML = geoCity;
    // Displays weather info for current location, can be changed by just enetering a new city in window prompt after clicking button.
    const multiQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ geoCity + "&appid=" + APIKey;
    logMultiJSONData(multiQueryURL)
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + geoCity + "&appid=" + APIKey;
    logJSONData(queryURL);
    // ChatGPT helped me debug why this wasn't working when it was outside the getPositionSuccess function. It was simply outside the scope of the geoCity constant.
    // Above code from ChatGPT https://chat.openai.com.
}

// Below code inspired by: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
function getPositionDenied() {
    alert("Access to location denied by user.");
    document.getElementById('lat').innerHTML = "N/A";
    document.getElementById('long').innerHTML = "N/A";
  }
  
  const options = {
    enableHighAccuracy: true,
    maximumAge: 100000000,
    timeout: 27000,
  };
  
var watchID = navigator.geolocation.watchPosition(getPositionSuccess, getPositionDenied, options);

// Below Code also partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, and My Dad; what my Dad wrote has been modifified and added to greatly.
var Data;
async function logJSONData(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    Data = jsonData;
    console.log(Data);

    // Below implementation of image depending on "icon" in weathery arrary for OpenWeatherAPI JSON object from https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon.
    let dataIcon = Data['weather'][0]['icon'];
    let weatherIcon = document.getElementById('condition-icon');
    weatherIcon.innerHTML = `<img src=icons/${dataIcon}.png>`
    console.log(weatherIcon.innerHTML);
     //Above implementation of image depending on "icon" in weathery arrary for OpenWeatherAPI JSON object from https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon.
    document.getElementById("location").innerHTML = Data["name"];
   document.getElementById("place").innerHTML = Data["sys"]["country"];
   document.getElementById("condition").innerHTML = Data["weather"][0]["main"];
    document.getElementById("temp").innerHTML = "Temp: " + Math.round(Number(Data['main']['temp']-273.15));
    document.getElementById("feelsLike").innerHTML = "Feels Like: " + Math.round(Number(Data['main']['feels_like'])-273.15); 
    document.getElementById("wind").innerHTML = "Wind Speed: " + Number(Data["wind"]["speed"]) + "m/s";
}
// Above Code also partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, and My Dad; what my Dad wrote has been modifified and added to greatly.

var multiData;
async function logMultiJSONData(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    multiData = jsonData;
    console.log(multiData);

    var names = document.getElementsByClassName('multiLocation');
    for (var a = 0; a < names.length; a++) {
        names[a].innerHTML = multiData['city']['name'];
    }

    var dates = document.getElementsByClassName('date');
    for (var b = 0; b < dates.length; b++) {
        dates[b].innerHTML = multiData['list'][b]['dt_txt'];
    }

    var temps = document.getElementsByClassName('multiTemp');
    for (var c = 0; c < temps.length; c++) {
        temps[c].innerHTML = "Temp: " + Math.round(Number(multiData['list'][c]['main']['temp']-273.15));
    }

    var weatherIcons = document.getElementsByClassName('conIcon');
    for (d = 0; d < weatherIcons.length; d++) {
    var multiDataIcon = multiData['list'][d]['weather'][0]['icon'];
    weatherIcons[d].innerHTML = `<img src=icons/${multiDataIcon}.png>`
    }
}


// Below code from ChatGPT https://chat.openai.com/ *BUT* has been modified slightly
function interactiveWeatherQurty(event) {
    event.preventDefault();
    const weatherQuery = document.getElementById
    ("weatherQuery");
    const city = weatherQuery.value.trim();
    const multiCity = weatherQuery.value.trim();
    if (city !== "" && multiCity !== "") {
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    logJSONData(queryURL);
    const multiQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ multiCity + "&appid=" + APIKey;
    logMultiJSONData(multiQueryURL);
    }
}
const formCity = document.getElementById("formCity");
formCity.addEventListener("submit", interactiveWeatherQurty);
// Above code from ChatGPT https://chat.openai.com/ *BUT* has been modified slightly

/*
Above code partially from 
1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_prompt1
4. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
5. My Dad :)
*/

