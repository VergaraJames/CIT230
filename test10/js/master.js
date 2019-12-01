// Responsive Navigation Function
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
};

//Current Date Script
const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
};
document.getElementById('currentdate').textContent = new Date().toLocaleString('en-GB', options);

//Event Header
new Date().getDay() == 5 ? document.getElementById('party').innerHTML = "Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion." : document.getElementById('party').style.display = "block";

//Get current year 
var yearnow = new Date();
document.getElementById('thisyear').innerHTML = yearnow.getFullYear();

//Web Font Load API
WebFont.load({
    google: {
        families: ['Gudea', 'Acme']
    }
});



//Lazy Loading Images Script
const images = document.querySelectorAll("img[data-src]");

function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    } else {
        img.src = src;
    }
};

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});

//City Information API Load
fetch('https://byui-cit230.github.io/weather/data/towndata.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {

        const cities = jsonObject['towns'];
        const arrCity = ['Fish Haven', 'Preston', 'Soda Springs']
        for (let i = 0; i < cities.length; i++) {
            if (arrCity.includes(cities[i].name)) {
                let card = document.createElement('section');
                let info = document.createElement('div');
                let name = document.createElement('h2');
                let image = document.createElement('img');
                let motto = document.createElement('h3');
                let history = document.createElement('p');

                name.textContent = cities[i].name;
                motto.textContent = cities[i].motto;
                image.setAttribute('src', 'images/' + cities[i].photo);
                image.setAttribute('alt', 'Represetative Picture of ' + cities[i].name);
                history.innerHTML = ('The city of ' + cities[i].name + ' was founded in ' + cities[i].yearFounded + '. We invite you to our quiet town where our population is ' + cities[i].currentPopulation + '. The climate here is suitable for most out door activities. The annual percipitation is ' + cities[i].averageRainfall + '" for both rain and snow, making it more ideal than Great Britain. Come visit us for one of our events!')

                info.setAttribute('class', 'cityintro');
                info.appendChild(image);
                info.appendChild(history);

                card.appendChild(name);
                card.appendChild(motto);
                card.appendChild(info);

                document.querySelector('div.cityinfo').appendChild(card);
            }

        }
    });

//Weather demographics to be set by dynamic load off of meta tags for city page
var cc = document.getElementsByName('city_code')[0].getAttribute("content");
var CurrentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?id=" + cc + "&APPID=44816e5905baa4f18d6261ad8ccb925a&units=imperial";
var ForeCastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cc + "&APPID=44816e5905baa4f18d6261ad8ccb925a&units=imperial";

fetch(CurrentWeatherURL)
    .then(response => response.json())
    .then(jsObject => {
        document.getElementById("ccondition").innerHTML = jsObject.weather[0].main;
        document.getElementById("ctemp").innerHTML = jsObject.main.temp.toFixed(0) + ' &#8457';
        document.getElementById("htemp").innerHTML = jsObject.main.temp_max.toFixed(0) + ' &#8457';
        document.getElementById("humid").innerHTML = jsObject.main.humidity + '%';
        document.getElementById("wspeed").innerHTML = jsObject.wind.speed.toFixed(0) + ' mph';

    });

fetch(ForeCastWeatherURL)
    .then(response => response.json())
    .then(jsObject => {
        for (i = 0; i < 3; i++) {
            let trow = document.createElement('tr')
            trow.setAttribute('class', 'row' + (i + 1));
            document.querySelector('tbody').appendChild(trow);
        };
        for (j = 0; j < jsObject.list.length; j++) {
            if (jsObject.list[j].dt_txt.includes('18:00:00')) {
                let thcell = document.createElement('th');
                let ttcell = document.createElement('td');
                let ticell = document.createElement('td');
                let images = document.createElement('img');

                let fdate = new Date(jsObject.list[j].dt_txt);
                let wday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                images.setAttribute('src', "https://openweathermap.org/img/w/" + jsObject.list[j].weather[0].icon + ".png");
                images.setAttribute('alt', 'jsObject.list[j].weather[0].description');
                thcell.textContent = wday[fdate.getDay()];

                ticell.appendChild(images);
                ttcell.innerHTML = jsObject.list[j].main.temp.toFixed(0) + ' &#8457';

                document.querySelector('tr.row1').appendChild(thcell);
                document.querySelector('tr.row2').appendChild(ticell);
                document.querySelector('tr.row3').appendChild(ttcell);
            };
        };
    });


//wind chill calculator
var ct = parseFloat(document.getElementById("ctemp").textContent);
var ws = parseFloat(document.getElementById("wspeed").textContent);

if ((isNaN(ct) || isNaN(ws)) || ct >= 70) {
    document.getElementById("wchill").innerHTML = "N/A"
} else {
    document.getElementById("wchill").innerHTML = windchill(ct, ws) + '&#8457';
}

function windchill(tempF, speed) {
    return (Math.round(100 * (35.74 + (0.6215 * tempF) - (35.75 * speed ** 0.16) + (0.4275 * tempF * speed ** 0.16))) / 100);
};