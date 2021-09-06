var g = null;
const canvas = document.getElementById("playCanvas");
const context = canvas.getContext("2d");
function startgame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("playCanvas").style.display = "block";
    document.getElementById("pauseBtn").style.display = "block";
    var player = new wolf();
    player.loadImg(1);
    context.drawImage(player.img_run, 0,0, player.width, player.height);

}
function pause() {
    document.getElementById("pauseBtn").style.display = "none";
    document.getElementById("resumeBtn").style.display = "block";
}
function resume() {
    document.getElementById("resumeBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "block";
}



