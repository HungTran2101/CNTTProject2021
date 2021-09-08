var g = null;
var isMusic = false;
var music = document.getElementById("music");
var canvas = document.getElementById("playCanvas");
var context = canvas.getContext("2d");
var userInteract = false;

function startgame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("playCanvas").style.display = "block";
    document.getElementById("pauseBtn").style.display = "block";
    // player.loadImg(1);
    // context.drawImage(player.img_run, 0, 0, player.width, player.height);
}
function pauseGame() {
    document.getElementById("pauseBtn").style.display = "none";
    document.getElementById("resumeBtn").style.display = "block";
}
function resumeGame() {
    document.getElementById("resumeBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "block";
}
function backMusic() {
    console.log(2);
    if (!isMusic) {
        music.play();
        isMusic = true;
        document.getElementById("soundBtn").style.backgroundImage = "url('images/sound_on.png')"
    } else if (isMusic) {
        music.pause();
        isMusic = false;
        document.getElementById("soundBtn").style.backgroundImage = "url('images/sound_off.png')"
    }
}
function loginGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("lblConfPass").style.display= "none";
    document.getElementById("loginBtn1").innerText = "Login";
}
function signInGame(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("lblConfPass").style.display= "block";
    document.getElementById("loginBtn1").innerText = "Sign in";
}