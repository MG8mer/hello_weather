/*
Below code partially from 
1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_prompt1
4. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
5. My Dad :)
*/


    var APIKey = "ed0e35b9304aa2a810b22c9bc7a56b60"
    // Below code inspired by: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
    var watchID;
    var geoData;

    async function getPositionSuccess(position) {
    try {
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

    // Below code partially from ChatGPT https://chat.openai.com.

    const geoCity = geoData.features[0].properties.state || 'N/A';
    document.getElementById('geoCity').innerHTML = geoCity;

        // Displays weather info for current location, can be changed by just enetering a new city in window prompt after clicking button

        const multiQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ geoCity + "&appid=" + APIKey + "&units=metric";
        logMultiJSONData(multiQueryURL)

        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + geoCity + "&appid=" + APIKey + "&units=metric";
        logJSONData(queryURL);
    }
        
        // ChatGPT helped me debug why this wasn't working when it was outside the getPositionSuccess function. It was simply outside the scope of the geoCity constant.
            catch (err) {
                document.getElementById('htmlErr').innerHTML = "Error occured during reverse geocoding, please try again."
            }   
        // Above code partially from ChatGPT https://chat.openai.com.
    }

    // Below code inspired by: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API, https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_queryselector_class & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
    function getPositionDenied() {
        document.getElementById('geoCity').innerHTML = "Current Location not avaliable at this time."
        document.querySelector('.locErr').style.color = "red";
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
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        Data = jsonData;

        console.log(Data);

    // Below implementation of image depending on "icon" in weathery arrary for OpenWeatherAPI JSON object from https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon.

        let dataIcon = Data['weather'][0]['icon'];
        let weatherIcon = document.getElementById('condition-icon');
        weatherIcon.innerHTML = `<img src=icons/${dataIcon}.png>`

        // Above implementation of image depending on "icon" in weathery arrary for OpenWeatherAPI JSON object from https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon.

        
        const element = document.querySelector('body')
        if (dataIcon === '01n') {
            element.style.backgroundImage = "url('images/clear_night.jpg')"
            element.style.backgroundColor = "rgb(24, 33, 130)";
            element.style.color = 'white'   
        } 
        else if (dataIcon === '01d') {
            element.style.backgroundImage = "url('images/clear_day.jpg')"
            element.style.backgroundColor = "rgb(112, 199, 230)"
            element.style.color = 'black'   
        } 
        else if (dataIcon === '02d') {
            element.style.backgroundImage = "url('images/few_day.jpg')"
            element.style.backgroundColor = "rgb(112, 199, 230)"
            element.style.color = 'black'
        } 
        else if (dataIcon === '02n') {
            element.style.backgroundImage = "url('images/few_night.jpg')"
            element.style.backgroundColor = "rgb(24, 33, 130)"
            element.style.color = 'white'
        } 
        else if (dataIcon === '03d') {
            element.style.backgroundImage = "url('images/scattered_day.jpg')"
            element.style.backgroundColor = "rgb(112, 199, 230)"
            element.style.color = 'black'   
        } 
        else if (dataIcon === '03n') {
            element.style.backgroundImage = "url('images/scattered_night.jpg')"
            element.style.backgroundColor = "rgb(24, 33, 130)"
            element.style.color = 'white'   
        } 
        else if (dataIcon === '04d') {
            element.style.backgroundImage = "url('images/broken_day.jpg')"
            element.style.backgroundColor = "rgb(112, 199, 230)"
            element.style.color = 'black'   
        } 
        else if (dataIcon === '04n') {
            element.style.backgroundImage = "url('images/broken_night.jpg')"
            element.style.backgroundColor = "rgb(24, 33, 130)"
            element.style.color = 'white'   
        } 
        else if (dataIcon === '09d' || dataIcon === '10d') {
            element.style.backgroundImage = "url('images/rain_day.jpg')"
            element.style.backgroundColor = "rgb(112, 199, 230)"
            element.style.color = 'black' 
        } 
        else if (dataIcon === '09n' || dataIcon === '10n') {
            element.style.backgroundImage = "url('images/rain_night.jpg')"
            element.style.backgroundColor = "rgb(24, 33, 130)"
            element.style.color = 'white'   
        } 
        else if (dataIcon === '11d') {
            element.style.backgroundImage = "url('images/thunder_day.jpg')"
            element.style.backgroundColor = "rgb(112, 199, 230)"
            element.style.color = 'black'   
        }
        else if (dataIcon === '11n') {
            element.style.backgroundImage = "url('images/thunder_night.jpg')"
            element.style.backgroundColor = "rgb(24, 33, 130)"
            element.style.color = 'white'   
        } 
        else if (dataIcon === '13d') {
            element.style.backgroundImage = "url('images/snowy_day.jpg')"
            element.style.backgroundColor = "rgb(112, 199, 230)"
            element.style.color = 'black'   
        } 
        else if (dataIcon === '13n') {
            element.style.backgroundImage = "url('images/snowy_night.jpg')"
            element.style.backgroundColor = "rgb(24, 33, 130)"
            element.style.color = 'black'   
        } 
        else if (dataIcon === '50d') {
            element.style.backgroundImage = "url('images/misty_day.png')"
            element.style.backgroundColor = "rgb(112, 199, 230)"
            element.style.color = 'black'   
        } 
        else if (dataIcon === '50n') {
            element.style.backgroundImage = "url('images/misty_night.jpg')"
            element.style.backgroundColor = "rgb(24, 33, 130)"
            element.style.color = 'white'   
        } 

        document.getElementById('htmlErr').innerHTML = ""; // Clear div with 'htmlErr' id as if this code fully runs there is no reason to dislay an error message

        document.getElementById("location").innerHTML = Data["name"] + ", " + Data["sys"]["country"]; // City name & Country
        document.getElementById("condition").innerHTML = Data["weather"][0]["main"]; // Weather description
        document.getElementById("temp").innerHTML = Math.round(Number(Data['main']['temp'])) + '\u00B0'; // Temperature
        document.getElementById("feelsLike").innerHTML = "Feels Like: " + Math.round(Number(Data['main']['feels_like'])) + '\u00B0';  // Temperature that it feels like
        document.getElementById("wind").innerHTML = "Wind Speed: " + Number(Data["wind"]["speed"]) + "m/s"; // Wind Speed
        document.getElementById('humidity').innerHTML = "Humidity: " + Number(Data["main"]["humidity"]) + "%"; // Humidity %
        document.getElementById('pressure').innerHTML = "Pressure: " + Data['main']['pressure'] + " Pa" // Pressure

        document.getElementById('sunriseTxt').innerHTML = "Sunrise"; // Sunrise text field
        document.getElementById('sunsetTxt').innerHTML = "Sunset"; // Sunset text field

        // Below code inspired by: https://www.tutorialrepublic.com/codelab.php?topic=faq&file=convert-unix-timestamp-to-javascript-time'
        var unixSunrise = Data['sys']['sunrise'];
        var unixSunset = Data['sys']['sunset'];

        var standardDay = new Date(unixSunrise * 1000);
        var standardNight = new Date(unixSunset * 1000);

        document.getElementById('sunrise').innerHTML = standardDay.toLocaleTimeString('default') + '<img src=icons/01d.png>';
        document.getElementById('sunset').innerHTML = standardNight.toLocaleTimeString('default') + '<img src=icons/01n.png>';
        // Above code inspired by: https://www.tutorialrepublic.com/codelab.php?topic=faq&file=convert-unix-timestamp-to-javascript-time

        document.getElementById('vision').innerHTML = "Visibility: " + Data['visibility']/1000 + " km" // Visibility (km)
    }
    catch (err) {
        document.getElementById('htmlErr').innerHTML = "Not a defined city, try again."
    }
    }
    // Above Code also partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, and My Dad; what my Dad wrote has been modifified and added to greatly.

    var multiData;
    async function logMultiJSONData(url) {
    try {
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
            temps[c].innerHTML = Math.round(Number(multiData['list'][c]['main']['temp'])) + '\u00B0'; // Code for unicode character (\u00B0) for degrees from http://gdichicago.com/courses/gdi-featured-js-intro/homework.html#:~:text=Unicode%20Characters%3A%20To%20print%20the,character%20for%20the%20degress%20symbol.
        }

        var weatherIcons = document.getElementsByClassName('conIcon');
        for (var d = 0; d < weatherIcons.length; d++) {
            var multiDataIcon = multiData['list'][d]['weather'][0]['icon'];
            weatherIcons[d].innerHTML = `<img src=icons/${multiDataIcon}.png width=64 height=64>`
        }

        var countries = document.getElementsByClassName('multiCountry');
        for (var e = 0; e < countries.length; e++) {
        countries[e].innerHTML = multiData['city']['country']
        }

        var descriptions = document.getElementsByClassName('multiDesc');
        for (var f = 0; f < descriptions.length; f++) {
            descriptions[f].innerHTML = multiData['list'][f]['weather'][0]['main']
        }
    }
     catch (err) {
        document.getElementById('htmlErr').innerHTML = "Not a defined city, try again."
        }
    }


    // Below code from ChatGPT https://chat.openai.com/ *BUT* has been modified slightly
    function interactiveWeatherQuery(event) {
        event.preventDefault();
        const weatherQuery = document.getElementById
        ("weatherQuery");
        const city = weatherQuery.value.trim();
        const multiCity = weatherQuery.value.trim();
        if (city !== "" && multiCity !== "") {
            const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric";
            logJSONData(queryURL);
            const multiQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ multiCity + "&appid=" + APIKey + "&units=metric";
            logMultiJSONData(multiQueryURL);
        }
    }
    const formCity = document.getElementById("formCity");
    formCity.addEventListener("submit", interactiveWeatherQuery);


    // Above code from ChatGPT https://chat.openai.com/ *BUT* has been modified slightly

    /*
    Above code partially from 
    1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
    2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    3. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_prompt1
    4. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
    5. My Dad :)
    */

