document.getElementById("modified").innerHTML = todayDate();

function todayDate() {
    var today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var month = months[today.getMonth()];
    var day = days[today.getDay()];
    var dayDate = today.getDate();
    var year = today.getFullYear();
    return  day + ", " + dayDate + " " + month + " " + year;
}

function toggleMenu ()  {
    if (document.getElementsByClassName("navigation")[0].classList == "navigation"){
        document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
        document.getElementById("ham").innerHTML= "&#x2715";
    } else {
        document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
        document.getElementById("ham").innerHTML= "&#9776 Menu";
    }

}