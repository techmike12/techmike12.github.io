function updated() {
document.getElementById("copyright").innerHTML = new Date().getFullYear();
document.getElementById("modified").innerHTML = "Last updated: " + document.lastModified;
}