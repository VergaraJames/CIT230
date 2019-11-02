function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}


function showhide() {
    var d = new Date();
    var s = document.getElementById(+d.getDay());
    s.style.display = s.style.display == "block" ? "none" : "block";
}

function wChill() {
    var temp = parseFloat(document.getElementById("temperature").textContent);
    var wSpeed = parseFloat(document.getElementById("windS").textContent);
    var windChill =
        35.74 + 0.6215 * temp + (0.4275 * temp - 35.75) * Math.pow(wSpeed, 0.16);
    document.getElementById("windChill").textContent = parseInt(windChill);
}

function pancakes() {
    var day = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var today = weekday[day.getDay()];
    if (today == weekday[0]) {
        document.getElementById("pancakes").innerHTML =
            "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion.";
    }
}

function pancakes() {
    var day = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var today = weekday[day.getDay()];
    if (today == "Friday") {
        //  console.log("I'll make you banana pancakes")
        document.getElementById("pancakes").innerHTML =
            "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion.";
    }
}

function get_day() {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hours: "numeric",
        minutes: "numeric",
        seconds: "numeric"
    };
    document.getElementById(
        "currentdate"
    ).textContent = new Date().toLocaleDateString("en-US", options);
}

function currentdate() {
    const daynames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const d = new Date();
    const dayName = daynames[d.getDay()];
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    const fulldate = dayName + ", " + monthName + " " + d.getDate() + ", " + year;
    document.getElementById("currentdate").textContent = fulldate;
}