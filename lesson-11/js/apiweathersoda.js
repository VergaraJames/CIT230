// Variables
let appId = 'f7ee9df4b712457a78edab4465753b2a';
let units = 'imperial';
const cityid = 5607916;
const city = "Soda Springs";


// weatherAPIURL
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?id=${cityid}&APPID=${appId}&units=${units}`;
// forecastAPIURL
const forecastAPIURL = `https://api.openweathermap.org/data/2.5/forecast?id=${cityid}&APPID=${appId}&units=${units}`;
const weatherIconPath = "https://openweathermap.org/img/w/";
const dow = new Intl.DateTimeFormat("en-US", {
    weekday: "short"
});

fetch(weatherAPIURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        const tempF = jsObject.main.temp.toFixed(0);
        const windSpeedMPH = jsObject.wind.speed.toPrecision(2);
        const windChillF = windChill(tempF, windSpeedMPH);
        document.getElementById('description').textContent = jsObject.weather[0].description;
        document.getElementById('temperature').textContent = tempF;
        document.getElementById('windchill').textContent = windChillF;
        document.getElementById('hightemp').textContent = jsObject.main.temp_max.toFixed(0);
        document.getElementById('humidity').textContent = jsObject.main.humidity.toFixed(0);
        document.getElementById('windspeed').textContent = windSpeedMPH;
    });

fetch(forecastAPIURL)
    .then((response) => response.json())
    .then((jsObject) => {
        const fiveDayForecast = jsObject.list.filter(isEarlyAfternoon);
        // Next Events
        nextEvents(city);
        fiveDayForecast.forEach(injectForecast)
    });

function injectForecast(forecast) {
    const d = new Date(forecast.dt * 1000);
    const imagesrc = 'https://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png';

    document.getElementById('five-day-grid').innerHTML +=
        `<div class="daily-forecast">
     <div class="dow">${dow.format(d)}</div>
     <img src="${imagesrc}" class="weather-icon"></img>
     <div class="temp">${forecast.main.temp.toFixed(0)} °F</div>
  </div>`
}

function isEarlyAfternoon(forecast) {
    return forecast.dt_txt.includes("18:00:00");
}

function windChill(tempF, speed) {
    const maxTempF = 50;
    const minWindSpeed = 3;
    let f = "N/A"
    if ((tempF <= maxTempF) && (speed >= minWindSpeed)) {
        f = (35.74 + (0.6215 * tempF) -
            (35.75 * speed ** 0.16) +
            (0.4275 * tempF * speed ** 0.16)).toFixed(0);
    }
    return f;
}

function nextEvents(town) {
    const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    const cardContainer = document.querySelector("div.nextEvents");
    fetch(requestURL)
        .then(response => { return response.json() })
        .then(json => {
            const towns = json["towns"];
            towns.forEach(town => {
                //Create the card
                let card = document.createElement("section");
                //Create the H2 element and content
                let h2 = document.createElement("h2");
                h2.textContent = `${town.name} `;
                //Create the H2 element and content
                // if (`${town.name}` == "Preston" || `${town.name}` == "Fish Haven" || `${town.name}` == "Soda Springs") {

                if (`${town.name}` == "Soda Springs") {
                    //Create information blurb element
                    let h2 = document.createElement("h2");
                    h2.innerHTML = `Next Events`;

                    let p = document.createElement("p");
                    p.innerHTML = `<hr>
                                       ${town.events[0]},<br>
                                       ${town.events[1]},<br>
                                       ${town.events[2]}`;
                    //Append elements to the card
                    //card.appendChild(h2);
                    card.appendChild(h2);
                    card.appendChild(p);
                    //Append finished card to the DOM
                    cardContainer.appendChild(card);
                };
            });
        });
}