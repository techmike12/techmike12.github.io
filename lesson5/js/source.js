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

/*Banner at top of screen for Friday's*/
document.getElementById("banner").innerHTML = banner();
function banner() {
    var today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[today.getDay()];
    if (day == "Friday") {
        document.getElementById("banner").style.display="flex";
    } else {
        document.getElementById("banner").style.display="none";
    }
    return "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion."
}