var g = null;
var music = document.getElementById("music");
var canvas = document.getElementById("playCanvas");
var context = canvas.getContext("2d");
var isPause = false;
var isMusic = false;
var isLoging = false;
function startgame() {
    document.getElementById("playCanvas").style.display = "block";
    document.getElementById("pauseBtn").style.display = "block";
    document.getElementById("twoForms").style.display = "none";
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
    if(login.checked){
        document.getElementById("main").style.opacity = 1;
        login.checked = false;
    }else{
        document.getElementById("main").style.opacity = 0.1;
        document.getElementById("signUpBtn").checked = false;
        document.getElementById("chbxConfPass").checked = false;
        document.getElementById("signInBtn").innerHTML = "Sign in";
        login.checked = true;
    }
    document.getElementById("signInBtn").innerText = "Sign in";
}
function signUpGame(){
    var signup = document.getElementById("signUpBtn");
    if(signup.checked){
        document.getElementById("main").style.opacity = 1;
        signup.checked = false;
    }else{
        document.getElementById("main").style.opacity = 0.1;
        document.getElementById("chbxConfPass").checked = true;
        document.getElementById("loginBtn").checked = false;
        document.getElementById("signInBtn").innerHTML = "Sign up";
        signup.checked = true;
    }
    document.getElementById("signInBtn").innerText = "Sign up";
}
function login() {
    document.getElementById("loginBtn").checked = false;
    document.getElementById("signUpBtn").checked = false;
    document.getElementById("main").style.opacity = 1;
}
function cancelLogin() {
    document.getElementById("loginBtn").checked = false;
    document.getElementById("signUpBtn").checked = false;
    document.getElementById("main").style.opacity = 1;
}
function storeBtn() {
    document.getElementById("storeBtn").checked = true;
}
function backStore() {
    document.getElementById("storeBtn").checked = false;
}