/*
Below code partially from 
1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_prompt1
4. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
5. My Dad :)
*/

    var APIKey = "ed0e35b9304aa2a810b22c9bc7a56b60" // API Key for OpenWeatherAPI
    // Below code inspired by: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch

    var watchID; // Global variable to use as a placeholder in the getPositionSuccess function to monitor user location.
    var geoData; // Global variable to use as a placeholder in the getPositionSuccess function to grab data from the JSON object fetched.

    async function getPositionSuccess(position) {
    try { // Defines a function asynchronous from the code flow that attempts to run certain lines of code in the case that the user allows for the website to track their location.
        var lat = position.coords.latitude; // Sets var lat to the latitude of the user's location (accesible through GeolocationAPI)
        var long = position.coords.longitude; // Sets long to the longitude of the user's location (accesible through GeolocationAPI)
        navigator.geolocation.clearWatch(watchID) // Stops actively monitoring for user's location.
        document.getElementById('lat').innerHTML = lat; // Sets the id 'lat''s innerHTML to the value of the variable 'lat'.
        document.getElementById('long').innerHTML = long; // Sets the id 'long''s innerHTML to the value of the variable 'long'.
    
    // Below code from ChatGPT https://chat.openai.com *BUT* has been slightly modified by myself.

    const apiKEY = '161a25f78acb4ba295beb5b75f8d77c2';  // API key for GeoapifyAPI.
    const geocodingAPI = "https://api.geoapify.com/v1/geocode/reverse?lat=" + lat +"&lon=" + long +"&apiKey=" + apiKEY; // Constant for the request link for GeoapifyAPI, with the paramters appropriately set to defined variables.

    // Below code partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys & https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch,

    const response = await fetch(geocodingAPI); // Awaits fetch request for the URL defined in the variable 'geocodingAPI'
    const jsonData = await response.json(); // Awaits the URL's response as a JSON object.
    geoData = jsonData; //  Sets the variable geoData as a placeholder equal to jsonData as jsonData is already being used to await a JSON object from the 'geocodingAPI' constant.
   
    console.log(geoData); // Logs the JSON object that 'geoData' has obtained.

    // Above code partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys & https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch,

    // Below code partially from ChatGPT https://chat.openai.com.

    const geoCity = geoData['features'][0]['properties']['state'] || 'N/A'; // Sets the constant 'geoCity' equal to the 'state' name defined within the JSON object that was fetched, which will be inputted to the weatherQuery.
    document.getElementById('geoCity').innerHTML = geoCity; // Sets the id 'geoCity' equal to the value of the constant 'geoCity'.

        // Displays weather info for current location, can be changed by just enetering a new city in window prompt after clicking button

        const multiQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ geoCity + "&appid=" + APIKey + "&units=metric"; // Sets a constant equal to a fetch URL with the parameters appropriately defined with the set with the appropriate variables.
        logMultiJSONData(multiQueryURL) // Displays the JSON object obtained from that URL.
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + geoCity + "&appid=" + APIKey + "&units=metric"; // Sets a constant equal to a fetch URL with the parameters appropriately defined with the set with the appropriate variables.
        logJSONData(queryURL); // Displays the JSON object obtained from that URL.
    }
        
        // ChatGPT helped me debug why this wasn't working when it was outside the getPositionSuccess function. It was simply outside the scope of the geoCity constant.
            catch (err) {
                document.getElementById('htmlErr').innerHTML = "Error occured during reverse geocoding, please try again."
            } // A function that catches any errors in the console and removes them, instead displaying them in an id that has the innerHTML of an error message.

        // Above code partially from ChatGPT https://chat.openai.com.
    }

    // Below code inspired by: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API, https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_queryselector_class & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
    function getPositionDenied() {  // Defines a function that runs certain lines of code in the case that the user does not allow for the website to track their location.
        document.getElementById('geoCity').innerHTML = "Current Location not avaliable at this time."
        document.querySelector('.locErr').style.color = "red";
        // Sets the innerHTML of geoCity to a message that is in red to resemble an error message.
        document.getElementById('lat').innerHTML = "N/A"; // Sets the id of 'lat' to N/A.
        document.getElementById('long').innerHTML = "N/A"; // Sets the id of 'long' to N/A.
    }
    
    const options = { // A constnat object that defines paramters for GeolocationAPI.
        enableHighAccuracy: true,
        maximumAge: 100000000,
        timeout: 27000,
    };
    
    var watchID = navigator.geolocation.watchPosition(getPositionSuccess, getPositionDenied, options); // Sets the variable 'watchID' to monitor whether the user allows or denies the website from tracking their location and to implement the paramters defined in the constant 'options'.

    // Below Code also partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, and My Dad; what my Dad wrote has been modifified and added to greatly.

    var Data; // Global variable to use as a placeholder in the logJSONData function to grab data from the JSON object fetched.
    async function logJSONData(url) {
    try { // Defines a function asynchronous from the code flow that attempts to run certain lines of code that fetch and display data obtained from OpenWeatherAPI.
        const response = await fetch(url); // Awaits fetch request for given URL.
        const jsonData = await response.json(); // Awaits the URL's response as a JSON object.
        Data = jsonData; // Sets the variable Data as a placeholder equal to jsonData as jsonData is already being used to await a JSON object from the given URL.

        console.log(Data); // Logs the JSON object that 'Data' has obtained.

    // Below implementation of image depending on "icon" in weathery arrary for OpenWeatherAPI JSON object from https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon.

        let dataIcon = Data['weather'][0]['icon']; // Lets dataIcon equal to the icon value within the JSON object obtained by 'Data'.
        let weatherIcon = document.getElementById('condition-icon');
        weatherIcon.innerHTML = `<img src=icons/${dataIcon}.png>` // Lets weatherIcon equal to the Id 'condition-icon' and sets the innerHTML of that equal to an image tag that has the image dependent on the value of 'dataIcon'. This can be done as the image icons have respectively named after their condition value.

        // Above implementation of image depending on "icon" in weathery arrary for OpenWeatherAPI JSON object from https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon.

        
        const element = document.querySelector('body') // Defines a constant equal to a querySelector selecting the tag 'body'.

        // Below code are a myriad of conditionals that change the background of the website and its font-color depending on the weather condition through let 'dataIcon'.
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
        var unixSunrise = Data['sys']['sunrise']; // Sunrise time
        var unixSunset = Data['sys']['sunset']; // Sunset time

        var standardDay = new Date(unixSunrise * 1000); // Creates new date constructor that multiplies sunrise number by 1000.
        var standardNight = new Date(unixSunset * 1000); // Creates new date constructor that multiplies sunset number by 1000.

        document.getElementById('sunrise').innerHTML = standardDay.toLocaleTimeString('default') + '<img src=icons/01d.png>'; // Sets the id of 'sunrise' equal to its time + an image of the sun.
        document.getElementById('sunset').innerHTML = standardNight.toLocaleTimeString('default') + '<img src=icons/01n.png>'; // Sets the id of 'sunset' equal to its time + an image of the moon.
        // Above code inspired by: https://www.tutorialrepublic.com/codelab.php?topic=faq&file=convert-unix-timestamp-to-javascript-time

        document.getElementById('vision').innerHTML = "Visibility: " + Data['visibility']/1000 + " km" // Visibility (km)
    }
    catch (err) {
        document.getElementById('htmlErr').innerHTML = "Not a defined city, try again."
    } // A function that catches any errors in the console and removes them, instead displaying them in an id that has the innerHTML of an error message.
    }
    // Above Code also partially from https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, and My Dad; what my Dad wrote has been modifified and added to greatly.


    // Below code already explained in behind_the_scene.html.
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
    // Above code already explained in behind_the_scene.html.


    // Below code from ChatGPT https://chat.openai.com/ *BUT* has been modified slightly
    function interactiveWeatherQuery(event) {
        event.preventDefault(); // No event will be handled until explicity told to do so by the user through their input.
        const weatherQuery = document.getElementById
        ("weatherQuery"); // Sets a constant called 'weatherQuery' equal to the innerHTML of an id called 'weatherQuery', which is an id set in the input tag to accept user input.
        const city = weatherQuery.value.trim(); // Sets the constant 'city 'equal to whatever city the user inputted and trims and leading or trailing spaces.
        const multiCity = weatherQuery.value.trim(); // Sets the constant 'multiCity' ALSO equal to whatever city the user inputted and trims and leading or trailing spaces.
        if (city !== "" && multiCity !== "") { // If the 'city' AND 'multicity' are not equal to 'null':
            const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric"; // Sets a constant equal to a fetch URL with the parameters appropriately defined with the set with the appropriate variables.
            logJSONData(queryURL); // Displays the JSON object obtained from that URL.
            const multiQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ multiCity + "&appid=" + APIKey + "&units=metric"; // Sets a constant equal to a fetch URL with the parameters appropriately defined with the set with the appropriate variables.
            logMultiJSONData(multiQueryURL); // Displays the JSON object obtained from that URL.
        }
    }
    const formCity = document.getElementById("formCity"); // Sets a constant equal to the id "formcity"
    formCity.addEventListener("submit", interactiveWeatherQuery); // Adds an eventListener to the interactiveWeatherQuery function that monitors when there is user input, having the "submit" type.


    // Above code from ChatGPT https://chat.openai.com/ *BUT* has been modified slightly

    /*
    Above code partially from 
    1. https://coding-boot-cap.github.io/full-stack/apis/how-to-use-api-keys 
    2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    3. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_prompt1
    4. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API & https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
    5. My Dad :)
    */

