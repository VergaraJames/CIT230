
      var temp = parseFloat(document.getElementById('temperature').textContent);
      var wSpeed = parseFloat(document.getElementById('windS').textContent);
      var windChill = 35.74 + 0.6215 * temp + (0.4275 * temp - 35.75) * Math.pow(wSpeed, 0.16);
     
     document.getElementById("wChill").textContent = parseInt(windChill);
    //console.log(windChill);