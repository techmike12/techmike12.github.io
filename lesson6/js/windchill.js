/*Calculate Wind Chill for Weather Summary*/
document.getElementById("windchill").innerHTML = windChill();

function windChill() {
    var high = document.getElementById("high").textContent;
    var high1 = parseInt(high[6]);
    var high2 = parseInt(high[7]);
    var temp = [];
    /*Check for valid number*/
    if (typeof high1 == 'number') {
        temp.push(high1);
    } else {
        console.log("Not a valid number");
    }

    if (typeof high2 == 'number') {
        temp.push(high2);
    } else {
        console.log("Not a valid number");
    }

    /*Create final temperature*/
    if (temp.length = 2) {
        var hightemp = parseInt("" + temp[0] + temp[1]);
    } else {
        var hightemp = temp[0];
    }

    /*Find Wind Speed*/
    var wind = document.getElementById("windspeed").textContent;
    var w = parseInt(wind[12]);
    var w2 = parseInt(wind[13]);
    var winds = [];
        /*Check for valid number*/
        if (typeof w == 'number') {
            winds.push(w);
        } else {
            console.log("Not a valid number");
        }

        if (typeof w2 == 'number') {
            winds.push(w2);
        } else {
            console.log("Not a valid number");
        }

        /*Create final wind speed*/
        if (winds.length = 2) {
            var windspeed = parseInt("" + winds[0] + winds[1]);
        } else {
            var windspeed = winds[0];
        }

    /*Calculate wind chill*/
    var windchill = 35.74 + (0.6215 * hightemp) - (35.75 * Math.pow(windspeed, .16)) + (0.4275 * hightemp * Math.pow(windspeed, .16));
    /*Format wind chill*/
    windchill = Math.round(windchill);
    /*Return message*/
    if (hightemp <= 50 && windspeed > 3) {
        return "<b>Wind Chill: </b>" + windchill + " &#176F"
    } else {
        return "<b>Wind Chill: </b>" + "N/A" + " &#176F"
    }
}