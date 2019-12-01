const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=9d347f89ba52d481b32f369e448b26a3";

const apiURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=9d347f89ba52d481b32f369e448b26a3";

fetchAPI = (apiURL, num) => {
    fetch(apiURL)
        .then((response) => response.json())
        .then((jsObject) => {

            switch (num) {
                case 1:
                    this.summaryBox(jsObject);
                    break;
                case 2:
                    this.fiveDay(jsObject);
                    break;
            }
        });
}

summaryBox = (jsObject) => {
    var mainObj = jsObject.main;

    document.getElementById('temp').textContent = jsObject.main.temp;
    document.getElementById('humidity').textContent = jsObject.main.humidity;
    document.getElementById('current-condition').textContent = jsObject.weather[0].description;;
    document.getElementById('wind-speed').textContent = jsObject.wind.speed;


    var temp = jsObject.main.temp;
    var speed = jsObject.wind.speed;
    var exp = Math.pow(speed, 0.16);
    var f = 35.74 + (0.6215 * temp) - (35.75 * exp) + (0.4275 * temp * exp);

    f.toFixed(2)

    document.getElementById("natalie").innerHTML = f.toFixed(2);

    console.log(f);
}

fiveDay = (jsObject) => {
    var count = 0;

    for (key in jsObject.list) {
        var textCheck = jsObject.list[key].dt_txt;
        if (textCheck.includes("18:00:00")) {
            count++;
            var varDay = "";
            var getDayVar = new Date(jsObject.list[key].dt_txt).getDay();

            switch (getDayVar) {
                case 1:
                    varDay = "Mon";
                    break;
                case 2:
                    varDay = "Tues";
                    break;
                case 3:
                    varDay = "Wed";
                    break;
                case 4:
                    varDay = "Thur";
                    break;
                case 5:
                    varDay = "Fri";
                    break;
                case 6:
                    varDay = "Sat";
                    break;
                case 0:
                    varDay = "Sun";
                    break;
            }
            document.getElementById('forecast' + count).textContent = varDay;
            const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.list[key].weather[0].icon + '.png';
            const desc = jsObject.list[key].weather[0].description;

            document.getElementById('temp' + count).textContent = jsObject.list[key].main.temp.toFixed(0);

            document.getElementById('weathericon' + count).setAttribute('src', imagesrc);
            document.getElementById('weathericon' + count).setAttribute('alt', desc);
        }
    }
}

checkWindchill = (temp, windSpeed) => {
    let t = (temp <= 50) ? true : false;
    let s = (windSpeed > 3.0) ? true : false;
    var chillDiv = document.getElementById("wind-chill");

    if (t && s) {

        let exp = Math.pow(windSpeed, 0.16);
        let feh = 35.74 + (0.6215 * temp) - (35.75 * exp) + (0.4275 * temp * exp);

        chillDiv.innerHTML = feh.toFixed(0) + ' F';

    } else {
        chillDiv.innerHTML = 'N/A';
    }
}

fetchAPI(apiURL, 1);
fetchAPI(apiURL2, 2);