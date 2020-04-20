function updated() {
document.getElementById("copyright").innerHTML = new Date().getFullYear();
document.getElementById("modified").innerHTML = "Last update: " + document.lastModified;
}