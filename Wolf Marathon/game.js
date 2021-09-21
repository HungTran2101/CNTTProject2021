//DoAnCNTT-2021

var canvas = document.getElementById("playCanvas");
var context = canvas.getContext("2d");
var menu = document.getElementById("menu");
var info = menu.getBoundingClientRect();
var music = document.getElementById("music");
var buyBtn = document.getElementsByClassName("buyBtn");
var textBuyBtn = document.getElementsByName("textBuyBtn");
var buyIcon = document.getElementsByClassName("buyIcon");
var textWallet = document.getElementById("wallet");

canvas.width = info.width;
canvas.height = info.height;
music.volume = 0.4;
var score = 0;
var wallet = 700;
var difficulty = 0;
var playerStatus = 0; //0-run 1-jump 2-die
var skinPrice = [200, 400, 600];
var wolfSkin = [0,1,2]; // 0-chưa mua 1-đã mua 2-đã trang bị
var cactusSkin = [1,0,2];
var bearSkin = [2,1,0];
var skinTarget = "wolf";

var player = new wolf(info.height * 0.605);
var obs = new obsticals(info.width, 415);

var isPause = false;
var isMusic = false;
var isLoging = false;

//#region game section
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
                if (!player.jumpDelay)
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
    textWallet.textContent = wallet.toString();
    selectSkin(0);
}

function backStore() {
    document.getElementById("storeBtn").checked = false;
}

function playerBuy(slot){
    if(skinTarget == "wolf"){
        buy_equipSkin(wolfSkin, slot);
        update_BuyBtn(wolfSkin);
    }
    else if(skinTarget == "cactus"){
        buy_equipSkin(cactusSkin, slot);
        update_BuyBtn(cactusSkin);
    }
    else{
        buy_equipSkin(bearSkin, slot);
        update_BuyBtn(bearSkin);
    }
}

function buy_equipSkin(skin, slot){
    if(skin[slot] == 0){
        skin[slot] = 1;
        bill(slot);
    }
    else{
        for(let i = 0;i<skin.length;i++){
            if(skin[i] == 2){
                skin[i] = 1;
            }
        }
        skin[slot] = 2;
    }
}

function bill(slot){
    wallet -= skinPrice[slot];
    textWallet.textContent = wallet.toString();
}

function selectSkin(option) {
    let btnWolf = document.getElementById("btnWolf");
    let btnCactus = document.getElementById("btnCactus");
    let btnBear = document.getElementById("btnBear");
    let slots = document.getElementsByClassName("inner-frame");
    if (option == 0) { //wolf
        btnWolf.classList.add("active");
        btnCactus.classList.remove("active");
        btnBear.classList.remove("active");
        slots[0].src = "images/wolf_jump1.png";
        slots[1].src = "images/wolf_jump2.png";
        slots[2].src = "images/wolf_jump3.png";
        update_BuyBtn(wolfSkin);
        skinTarget = "wolf";
    }
    else if (option == 1) { //cactus
        btnWolf.classList.remove("active");
        btnCactus.classList.add("active");
        btnBear.classList.remove("active");
        slots[0].src = "images/cactus1.png";
        slots[1].src = "images/cactus2.png";
        slots[2].src = "images/cactus3.png";
        update_BuyBtn(cactusSkin);
        skinTarget = "cactus";
    }
    else if (option == 2) { //bear
        btnWolf.classList.remove("active");
        btnCactus.classList.remove("active");
        btnBear.classList.add("active");
        slots[0].src = "images/bear1.png";
        slots[1].src = "images/bear2.png";
        slots[2].src = "images/bear3.png";
        update_BuyBtn(bearSkin);
        skinTarget = "bear";
    }
}

function update_BuyBtn(skin) {
    for (let i = 0; i < skin.length; i++) {
        if (skin[i] == 0) {
            buyBtn[i].classList.remove("equippedBtn");
            buyBtn[i].classList.remove("equipBtn");
            buyIcon[i].style.display = "block";
            textBuyBtn[i].innerText = skinPrice[i].toString();
            if (wallet < skinPrice[i]) {
                buyBtn[i].classList.add("poorBtn");
            }
            else {
                buyBtn[i].classList.remove("poorBtn");
            }
        }
        else {
            buyIcon[i].style.display = "none";
            if (skin[i] == 1) {
                buyBtn[i].classList.add("equipBtn");
                buyBtn[i].classList.remove("equippedBtn");
                textBuyBtn[i].innerText = "EQUIP";
            }
            else {
                buyBtn[i].classList.add("equippedBtn");
                buyBtn[i].classList.remove("equipBtn");
                textBuyBtn[i].innerText = "EQUIPPED";
            }
        }
    }
}

