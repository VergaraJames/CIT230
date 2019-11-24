// Variables
let appId = 'f7ee9df4b712457a78edab4465753b2a';
let units = 'imperial';

const apiURL = `https://api.openweathermap.org/data/2.5/weather?id=5604473&APPID=${appId}&units=${units}`;

fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        document.getElementById('current-temp').textContent = jsObject.main.temp;
        const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png';
        const desc = jsObject.weather[0].description;
        document.getElementById('imagesrc').textContent = imagesrc;
        document.getElementById('icon').setAttribute('src', imagesrc);
        document.getElementById('icon').setAttribute('alt', desc);
    });