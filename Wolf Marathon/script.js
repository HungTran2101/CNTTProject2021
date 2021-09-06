var g = null;
function startgame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("myCanvas").style.display = "block";
    document.getElementById("pause").style.display = "block";
    g = new game();
}
function pause() {
    document.getElementById("pause").style.display = "none";
    document.getElementById("resume").style.display = "block";
}
function resume() {
    document.getElementById("resume").style.display = "none";
    document.getElementById("pause").style.display = "block";
}



