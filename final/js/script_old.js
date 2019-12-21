// Variables
let appId = 'f7ee9df4b712457a78edab4465753b2a';
let units = 'metric';
let searchMethod;

/* ` Reading the information from Search boton */
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById("searchInput").value;
    if (searchTerm)
        searchWeather(searchTerm);
})

/* ` selecting how to search: Name of city or Zip number */
function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

/* Request API to server /json  */
/* from w3school.com https://www.w3schools.com/xml/xml_http.asp */
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    const url = `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`;
    const api = new XMLHttpRequest();
    api.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* Console test  */
            /* console.log(this.responseText); */
            /* convert the information to JSON */
            let result = JSON.parse(this.responseText);
            console.log(result);
            organizeInfo(result);
        }
    };
    api.open("GET", url, true);
    api.send();
}
/* Organizing the information  */
function organizeInfo(resultFromServer) {

    /* ` selecting the bacground picture depending the weather information */
    switch (resultFromServer.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url("img/clear.jpeg")';
            break;

        case "Clouds":
            document.body.style.backgroundImage = 'url("img/cloudy.jpeg")';
            break;

        case "Rain":
            document.body.style.backgroundImage = 'url("img/rain1.jpeg")';
            break;

        case "Drizzle":
            document.body.style.backgroundImage = 'url("img/rain2.jpg")';
            break;

        case "Mist":
            document.body.style.backgroundImage = 'url("img/clear.jpeg")';
            break;

        case "Thurderstorm":
            document.body.style.backgroundImage = 'url("img/storm.jpeg")';
            break;

        case "Snow":
            document.body.style.backgroundImage = 'url("img/snow.jpeg")';
            break;
        case "Haze":
            document.body.style.backgroundImage = 'url("img/haze.jpg")';
            break;

        default:
            break;
    }
    let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    let temperatureElement = document.getElementById("temperature");
    let humidityElement = document.getElementById("humidity");
    let windSpeedElement = document.getElementById("windSpeed");
    let cityHeader = document.getElementById("cityHeader");
    let countryHeader = document.getElementById("countryHeader");
    let weatherIcon = document.getElementById("documentIconImg");
    /* information about the Icon weather https://openweathermap.org/img/w/ */
    weatherIcon.src = "https://openweathermap.org/img/w/" + resultFromServer.weather[0].icon + ".png";
    let resultDescription = resultFromServer.weather[0].description;
    /* the first letter of information will be Uppercase */
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    /* "&#176" it is the signal to ° degrees centigrade or fahrenheit */
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
    windSpeedElement.innerHTML = "Winds at " + Math.floor(resultFromServer.wind.speed) + "m/s";
    cityHeader.innerHTML = resultFromServer.name;
    countryHeader.innerHTML = resultFromServer.sys.country;
    humidityElement.innerHTML = "Humidity levels at " + resultFromServer.main.humidity + "%";
    /* SET information in localStorage */
    localStorage.setItem("cityLSG", resultFromServer.name);
    localStorage.setItem("countryLSG", resultFromServer.sys.country);
    /* Calling the function to put the information into the container */

    setPositionForWeatherInfo();
}

/* Insert information into HTML */
function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById("weatherContainer");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;
    /* the position of the information into the container */
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(65% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = "visible";
    localSTG();
}

/* Insert information into HTML Local Storage */
function localSTG() {
    /*
        let cityLocal = document.getElementById("cityLocal");
        let countryLocal = document.getElementById("countryLocal");
        /* GET information in localStorage */

    var cityL = localStorage.getItem("cityLSG");
    var countryL = localStorage.getItem("countryLSG");

    document.getElementById("cityLocal").innerHTML = "<b>City : </b> " + cityL;
    document.getElementById("countryLocal").innerHTML = "<b>Contry : </b> " + countryL;


    let appId2 = "f25415a4f2bd42e085e72280f326f0f1";
    const url2 = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${cityL},${countryL}&key=${appId2}&hours=5`;
    /*  API Site by Hours   https://www.weatherbit.io/  */

    const api2 = new XMLHttpRequest();
    api2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* convert the information to JSON */
            let result2 = JSON.parse(this.responseText);
            console.log(result2);
            document.getElementById("field12").innerHTML = result2.data[0].temp;
            document.getElementById("field13").innerHTML = result2.data[0].weather.description;
            document.getElementById("field22").innerHTML = result2.data[1].temp;
            document.getElementById("field23").innerHTML = result2.data[1].weather.description;
            document.getElementById("field32").innerHTML = result2.data[2].temp;
            document.getElementById("field33").innerHTML = result2.data[2].weather.description;
            document.getElementById("field42").innerHTML = result2.data[3].temp;
            document.getElementById("field43").innerHTML = result2.data[3].weather.description;
            document.getElementById("field52").innerHTML = result2.data[4].temp;
            document.getElementById("field53").innerHTML = result2.data[4].weather.description;
            document.getElementById("date").innerHTML = "<b>Local Time: </b> " + result2.data[0].timestamp_local;
            document.getElementById("time").innerHTML = "<b>Time UTC: </b> " + result2.data[0].timestamp_utc;
            result2.data[0].timestamp_local;
        }
    };
    api2.open("GET", url2, true);
    api2.send();

}