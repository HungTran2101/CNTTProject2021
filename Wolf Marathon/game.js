var canvas = document.getElementById("playCanvas");
var context = canvas.getContext("2d");
var menu = document.getElementById("menu");
var info = menu.getBoundingClientRect();
var music = document.getElementById("music");

canvas.width = info.width;
canvas.height = info.height;
music.volume = 0.4;
var score = 0;
var wallet = 0;
var difficulty = 0;
var playerStatus = 0; //0-run 1-jump 2-die

var player = new wolf(info.height*0.605);
var obs = new obsticals(info.width, 415);

var isPause = false;
var isMusic = false;
var isLoging = false;
//#region game mechanic
function startgame() {
    document.getElementById("playCanvas").style.display = "block";
    document.getElementById("pauseBtn").style.display = "block";
    document.getElementById("Forms").style.display = "none";
    document.addEventListener("keypress", function onPress(event) {
        if (event.key == " " && !isPause) {
            event.preventDefault();
            player.isJump = true;
            if (player.y < player.preY && player.y > (player.preY - player.jumpDistance / 1.5) && player.isFall) {
                player.jumpDelay = true;
            }
        }
    });
    init();
}
function init() {
    score = 0;
    wallet = 0;
    isPause = false;
    player.isJump = false;
    player.loadImg(0);
    loop();
}
function loop() {
    if (!isPause) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (player.isJump) {
            if (player.jump(difficulty)) { //jump done
                if(!player.jumpDelay)
                    player.isJump = false;
                player.g = 0.1;
                player.isFall = false;
                player.jumpDelay = false;
            }
            playerStatus = 1;
        }
        else {
            playerStatus = 0;
        }
        spawnObstacle();
        drawObstacle();
        drawPlayer();
        
    }
    setTimeout(() => loop(), 10);
}
function spawnObstacle() {

}
function drawObstacle() {

}
function drawPlayer() {
    switch (playerStatus) {
        case 0: context.drawImage(player.img_run, player.x, player.y, player.width, player.height); break;
        case 1: context.drawImage(player.img_jump, player.x, player.y, player.width, player.height); break;
        case 2: context.drawImage(player.img_die, player.x, player.y, player.width, player.height); break;
    }
}
//#endregion

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
function toggleMusic() {
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
    if (login.checked) {
        document.getElementById("main").style.opacity = 1;
        login.checked = false;
    } else {
        document.getElementById("main").style.opacity = 0.1;
        document.getElementById("signUpBtn").checked = false;
        document.getElementById("chbxConfPass").checked = false;
        document.getElementById("signInBtn").innerHTML = "Sign in";
        login.checked = true;
    }
}
function signUpGame() {
    var signup = document.getElementById("signUpBtn");
    if (signup.checked) {
        document.getElementById("main").style.opacity = 1;
        signup.checked = false;
    } else {
        document.getElementById("main").style.opacity = 0.1;
        document.getElementById("chbxConfPass").checked = true;
        document.getElementById("loginBtn").checked = false;
        document.getElementById("signInBtn").innerHTML = "Sign up";
        signup.checked = true;
    }
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
function buyWolf() {
    var wolf = document.getElementsByClassName("wolfIcon");
    var cactus = document.getElementsByClassName("cactusIcon");
    var bear = document.getElementsByClassName("bearIcon");
    for(var i=0; i<wolf.length;i++){
        wolf[i].style.display = "block";
        cactus[i].style.display = "none";
        bear[i].style.display = "none";
    }
}
function buyCactus() {
    var wolf = document.getElementsByClassName("wolfIcon");
    var cactus = document.getElementsByClassName("cactusIcon");
    var bear = document.getElementsByClassName("bearIcon");
    for(var i=0; i<wolf.length;i++){
        wolf[i].style.display = "none";
        cactus[i].style.display = "block";
        bear[i].style.display = "none";
    }
}
function buyBear() {
    var wolf = document.getElementsByClassName("wolfIcon");
    var cactus = document.getElementsByClassName("cactusIcon");
    var bear = document.getElementsByClassName("bearIcon");
    for(var i=0; i<wolf.length;i++){
        wolf[i].style.display = "none";
        cactus[i].style.display = "none";
        bear[i].style.display = "block";
    }
}
function buyWolf() {
    document.getElementById("iconGold1").style.display = "none";
    document.getElementById("btnImage1").innerText = "EQUIP";
    let flag = document.querySelector("#btnImage1");
    flag.addEventListener(flag.style.backgroundColor = "red");
}
function buyCactus() {
    document.getElementById("iconGold2").style.display = "none";
    document.getElementById("btnImage2").innerText = "EQUIP";
    let flag = document.querySelector("#btnImage2");
    flag.addEventListener(flag.style.backgroundColor = "red");
}
function buyBear() {
    document.getElementById("iconGold3").style.display = "none";
    document.getElementById("btnImage3").innerText = "EQUIP";
    let flag = document.querySelector("#btnImage3");
    flag.addEventListener(flag.style.backgroundColor = "red");
}
