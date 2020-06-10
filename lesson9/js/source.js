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
            //Create Element Variables
            let card = document.createElement('section');
            let image = document.createElement('img');
            let name = document.createElement('h2');
            let motto = document.createElement('h4');
            let year = document.createElement('p');
            let pop = document.createElement('p');
            let rain = document.createElement('p');

            //Create Content
            image.setAttribute('src', 'Images/' + towns[i].photo);
            image.setAttribute('alt', towns[i].name);
            name.textContent = towns[i].name;
            motto.textContent = '\"' + towns[i].motto +'\"';
            year.textContent = 'Year Founded: ' + towns[i].yearFounded;
            pop.textContent = 'Population: ' + towns[i].currentPopulation;
            rain.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall;

            //Add elements into section
            card.appendChild(image);
            card.appendChild(motto);
            card.appendChild(year);
            card.appendChild(pop);
            card.appendChild(rain);
            document.querySelector('div.towncard').appendChild(card);
        }
    }
  });