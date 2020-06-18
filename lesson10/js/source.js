/*Display date in the footer*/
document.getElementById("modified").innerHTML = todayDate();
function todayDate() {
    var today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var month = months[today.getMonth()];
    var day = days[today.getDay()];
    var dayDate = today.getDate();
    var year = today.getFullYear();
    return  day + ", " + dayDate + " " + month + " " + year;
}

/*Hamburger menu for small display*/
function toggleMenu ()  {
    if (document.getElementsByClassName("navigation")[0].classList == "navigation"){
        document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
        document.getElementById("ham").innerHTML= "&#x2715";
    } else {
        document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
        document.getElementById("ham").innerHTML= "&#9776 Menu";
    }

}

/*Getting data for towns*/
function loadTowns() {
const requestURL = 'https://raw.githubusercontent.com/techmike12/techmike12.github.io/master/lesson9/data/towndata.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const towns = jsonObject['towns'];

    //Create elements and content in HTML
    for (let i = 0; i < towns.length; i++ ) {
        //Check content for the three towns
        if (towns[i].name == "Preston" || towns[i].name == "Fish Haven" || towns[i].name == "Soda Springs") {
            let prefix = towns[i].name == "Preston" ? "p" : towns[i].name == "Soda Springs" ? "ss" : towns[i].name == "Fish Haven" ? "fh" : "";

            //Create section/Image
            let card = document.createElement('section');
            card.setAttribute('id', prefix + '_section')
            let image = document.createElement('img');
            image.setAttribute('src', 'Images/' + towns[i].photo);
            image.setAttribute('alt', towns[i].name);
            image.setAttribute('class', 'cityImage');

            //Create div for city details
            image.setAttribute('id', prefix + '_image');
            let detail = document.createElement('div');
            detail.setAttribute('class', 'cityDetail')
            detail.setAttribute('id', prefix + '_detail');

            //Create detail of city
            let name = document.createElement('h2');
            name.textContent = towns[i].name;
            let motto = document.createElement('h4');
            motto.textContent = '\"' + towns[i].motto +'\"';
            let year = document.createElement('p');
            year.textContent = 'Year Founded: ' + towns[i].yearFounded;
            let pop = document.createElement('p');
            pop.textContent = 'Population: ' + towns[i].currentPopulation;
            let rain = document.createElement('p');
            rain.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall;

            //Add elements into section
            card.appendChild(image);
            card.appendChild(detail);
            detail.appendChild(name);
            detail.appendChild(motto);
            detail.appendChild(year);
            detail.appendChild(pop);
            detail.appendChild(rain);
            document.querySelector('div.towncard').appendChild(card);
        }
    }
  });
}

/*Banner at top of screen for Friday's*/
function banner() {
    var today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[today.getDay()];
    if (day == "Friday") {
        document.getElementById("banner").style.display="flex";
    } else {
        document.getElementById("banner").style.display="none";
    }
    document.getElementById("banner").innerHTML = "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion."
}

/*Rating*/
function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}

/*Load images as user scrolls*/
function loadImages() {
const images = document.querySelectorAll("img[data-src]");

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

const loadImages = (img) => {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = () => {
      img.removeAttribute('data-src');
    };
}

if("IntersectionObserver" in window) {
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entries) => {
        if (!entries.isIntersecting) {
            return;
        } else {
            loadImages(entries.target);
            imgObserver.unobserve(entries.target);
        }
    });
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}
}

/*Weather summary for Preston page*/
function prestonWeather() {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=96515e8b6f69b72205d859e040349332";
fetch(apiURL)
  .then((response) => response.json())
  .then((preston) => {
    console.log(preston);
    let discription = preston.weather[0].description;
    /*Make upper case*/
    let current = discription.charAt(0).toUpperCase() + discription.slice(1);
    const high = "<b>High: </b>" + Math.round(preston.main.temp_max) + " &#176;F";
    const currently = "<b>Currently: </b>" + current;
    const humidity = "<b>Humidity: </b>" + preston.main.humidity + "%";
    const windspeed = "<b>Windspeed: </b>" + Math.round(preston.wind.speed) + " mph";

    document.getElementById('high').innerHTML = high;
    document.getElementById('windspeed').innerHTML = windspeed;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('current').innerHTML = currently;
  });
}

/*Weather 5 day forecast for Preston page*/
function prestonForecast() {
    const apiURL = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=96515e8b6f69b72205d859e040349332";
fetch(apiURL)
  .then((response) => response.json())
  .then((preston) => {
    console.log(preston);
    const prestonList = preston.list;
    let counter = 0;
    for (let i = 0; i < prestonList.length; i++ ) {
        let day = prestonList[i].dt_txt;
        if (day.substr(11, 19) == '18:00:00') {
            counter++
            /*Get correct day for forecast*/
            /*Display as Month/Day*/
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let monthDate = parseInt((day[5] + day[6]) - 1);
            let date = day[8] + day[9];
            let month = months[monthDate];
            let fullDate = month + " " + date;
            let dateElement = 'date' + counter;
            document.getElementById(dateElement).innerHTML = fullDate;

            /*Get description*/
            let discriptionLower = prestonList[i].weather[0].description;
            let discription = discriptionLower.charAt(0).toUpperCase() + discriptionLower.slice(1);
            let discriptionElement = 'condition' + counter;
            document.getElementById(discriptionElement).innerHTML = discription;

            /*Get temp-max*/
            let temp = Math.round(prestonList[i].main.temp_max) + " &#176;F";
            let tempElement = 'day' + counter + '_weather';
            document.getElementById(tempElement).innerHTML = temp;

            /*Icon for weather*/
            const imagesrc = 'https://openweathermap.org/img/w/' + prestonList[i].weather[0].icon + '.png';
            let imageElement = 'weather_icon' + counter;
            document.getElementById(imageElement).setAttribute('src', imagesrc);
            document.getElementById(imageElement).setAttribute('alt', discription);
            windChill();
        }
    }
  });
}

/*Calculate Wind Chill for Weather Summary*/
function windChill() {
    var high = document.getElementById("high").innerHTML;
    const windspeed = document.getElementById('windspeed').innerHTML;
    var highText = parseInt(high[13] + high[14]);
    var windText = parseInt(windspeed[18] + windspeed[19]);

    /*Calculate wind chill*/
    let windchill = 35.74 + (0.6215 * highText) - (35.75 * (windText ** .16)) + (0.4275 * highText * (windText ** .16));
    /*Return message*/
    if (highText <= 50 && windchill > 3) {
        document.getElementById("windchill").innerHTML = "<b>Wind Chill: </b>" + Math.round(windchill) + " &#176F";
    } else {
        document.getElementById("windchill").innerHTML = "<b>Wind Chill: </b>" + "N/A";
    }
}