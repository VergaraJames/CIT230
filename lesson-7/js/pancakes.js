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
if(today=="Friday"){
  //  console.log("I'll make you banana pancakes")
  document.getElementById("pancakes").innerHTML ="Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion." ;
}