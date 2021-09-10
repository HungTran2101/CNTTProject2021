var g = null;
var music = document.getElementById("music");
var canvas = document.getElementById("playCanvas");
var context = canvas.getContext("2d");
var isPause = false;
var isMusic = false;
var isLoging = false;

function startgame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("playCanvas").style.display = "block";
    document.getElementById("pauseBtn").style.display = "block";
    // player.loadImg(1);
    // context.drawImage(player.img_run, 0, 0, player.width, player.height);
}
function pause_resumeGame() {
    if (!isPause) {
        document.getElementById("pauseBtn").style.backgroundImage = "url('images/resume_btn.png')"
        isPause = true;
    }
    else {
        document.getElementById("pauseBtn").style.backgroundImage = "url('images/pause_btn.png')"
        isPause = false;
    }
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
    var login = document.getElementById("loginBtn");
    document.getElementById("signUpBtn").checked = false;
    document.getElementById("lblConfPass").style.display = "none";
    if(login.checked){
        document.getElementById("main").style.opacity = 1;
    }else{
        document.getElementById("main").style.opacity = 0.1;
    }
}
function signUpGame(){
    var signup = document.getElementById("signUpBtn");
    document.getElementById("loginBtn").checked = false;
    document.getElementById("lblConfPass").style.display = "block";
    if(signup.checked){
        document.getElementById("main").style.opacity = 1;
    }else{
        document.getElementById("main").style.opacity = 0.1;
    }
}
function cancelLogin() {
    document.getElementById("loginBtn").checked = false;
    document.getElementById("signUpBtn").checked = false;
    document.getElementById("main").style.opacity = 1;
}