/*
Below code from https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys:
*/
var Data;
async function logJSONData(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    Data = jsonData;
    document.getElementById("output").innerHTML = Data['main']['temp'];
}


var APIKey = "ed0e35b9304aa2a810b22c9bc7a56b60";

var city = "amman";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

logJSONData(queryURL)/*
Above code from https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys:
*/



// http://api.openweathermap.org/data/2.5/weather?q=amman&appid=ed0e35b9304aa2a810b22c9bc7a56b60