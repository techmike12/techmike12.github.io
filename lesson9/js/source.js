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