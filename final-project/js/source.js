function loadrentdata() {
const requestURL = 'https://raw.githubusercontent.com/techmike12/techmike12.github.io/master/final-project/data/rentdata.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const rent = jsonObject['rent'];

    //Create elements and content in HTML
    for (let i = 0; i < rent.length; i++ ) {
            //Prefix for section ID
            /*let prefix = rent[i].name == "Honda Metropolitan (49cc)" ? "metro" :
            rent[i].name == "Honda Dio" ? "dio" :
            rent[i].name == "Honda PCX150" ? "pcx" :
            rent[i].name == "Honda Pioneer ATV" ? "atv" :
            rent[i].name == "Jeep Wrangler - 4 door with a/c" ? "4d" :
            rent[i].name == "Jeep Wrangler - 2 door" ? "2d" : "";*/
            //Create section/Image
            let card = document.createElement('div');
            card.setAttribute('class', 'rentalDiv')
            let image = document.createElement('img');
            image.setAttribute('src', './Images/' + rent[i].picture);
            image.setAttribute('alt', rent[i].name);
            image.setAttribute('class', 'rentalImage');

            //Create div for rental image
            let detail = document.createElement('section');
            detail.setAttribute('class', 'rentalDetail')
            let name = document.createElement('h4');
            name.textContent = rent[i].name;
            let persons = document.createElement('p');
            persons.textContent = "Max person(s): " + rent[i].person;
            let reserveFull = document.createElement('p');
            reserveFull.textContent = rent[i].reservprices_full;
            let reserveHalf = document.createElement('p');
            reserveHalf.textContent = rent[i].reservprices_half;
            let walkFull = document.createElement('p');
            walkFull.textContent = rent[i].walkprices_full;
            let walkHalf = document.createElement('p');
            walkHalf.textContent = rent[i].walkprices_half;


            //Add elements into section
            card.appendChild(image);
            card.appendChild(detail);
            detail.appendChild(name);
            detail.appendChild(persons);
            detail.appendChild(reserveFull);
            detail.appendChild(reserveHalf);
            detail.appendChild(walkFull);
            detail.appendChild(walkHalf);
            document.getElementById('rental').appendChild(card);
    }
  });
}

/*Display date in the footer*/
document.getElementById("modified").innerHTML = "Last updated: " + document.lastModified;

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

/*Rating*/
function adjustRating(period) {
    document.getElementById("periodValue").innerHTML = period;
}

/*Weather summary home pages*/
function pageWeather(id) {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=" + id + "&units=imperial&APPID=96515e8b6f69b72205d859e040349332";
fetch(apiURL)
  .then((response) => response.json())
  .then((town) => {
    console.log(town);
    let discription = town.weather[0].description;
    /*Make upper case*/
    let current = discription.charAt(0).toUpperCase() + discription.slice(1);
    const high = "<b>Current Temp: </b>" + Math.round(town.main.temp) + " &#176;F";
    const currently = "<b>Currently: </b>" + current;
    const humidity = "<b>Humidity: </b>" + town.main.humidity + "%";

    document.getElementById('high').innerHTML = high;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('current').innerHTML = currently;
  });
}

/*Weather 5 day forecast home page*/
function pageForecast(id) {
    const apiURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=imperial&APPID=96515e8b6f69b72205d859e040349332";
fetch(apiURL)
  .then((response) => response.json())
  .then((town) => {
    console.log(town);
    const townList = town.list;
    let counter = 0;
    for (let i = 0; i < townList.length; i++ ) {
        let day = townList[i].dt_txt;
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
            let discriptionLower = townList[i].weather[0].description;
            let discription = discriptionLower.charAt(0).toUpperCase() + discriptionLower.slice(1);
            let discriptionElement = 'condition' + counter;
            document.getElementById(discriptionElement).innerHTML = discription;

            /*Get temp-max*/
            let temp = Math.round(townList[i].main.temp_max) + " &#176;F";
            let tempElement = 'day' + counter + '_weather';
            document.getElementById(tempElement).innerHTML = temp;

            /*Icon for weather*/
            const imagesrc = 'https://openweathermap.org/img/w/' + townList[i].weather[0].icon + '.png';
            let imageElement = 'weather_icon' + counter;
            document.getElementById(imageElement).setAttribute('src', imagesrc);
            document.getElementById(imageElement).setAttribute('alt', discription);
        }
    }
  });
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