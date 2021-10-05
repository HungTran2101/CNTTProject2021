//DoAnCNTT-2021

var canvas = document.getElementById("playCanvas");
var context = canvas.getContext("2d");
var menu = document.getElementById("menu");
var info = menu.getBoundingClientRect();
var music = document.getElementById("music");
var buyBtn = document.getElementsByClassName("buyBtn");
var textBuyBtn = document.getElementsByName("textBuyBtn");
var buyIcon = document.getElementsByClassName("buyIcon");
var storeWallet = document.getElementById("wallet");
var playWallet = document.getElementById("playWallet");
var myScores = document.getElementById("score");

canvas.width = innerWidth * 0.65;
canvas.height = innerHeight * 0.73;
music.volume = 0.4;

var player; //(info.height * 0.570);
var obs; //(info.width, info.height * 0.611);
var coin;

var score = 0;
var wallet = 70000;
var difficulty = 1;
var playerStatus = 0; //0-run 1-jump 2-die
var skinPrice = [200, 400, 600];
var wolfSkin = [0, 1, 2]; // 0-for sell 1-equip 2-equipped
var cactusSkin = [1, 0, 2];
var bearSkin = [2, 1, 0];
var skinTarget = "wolf";
var currentObs = null;
var currentCoin = null;
var playerMoveDirection = 0; //0 - not moving   10 - move right   -10 - move left

var obsSpawned = false;
var coinSpawned = false;
var isPause = false;
var isMusic = false;
var isLose = false;
var isHitCoin = false;

//#region game section
function loadData() {
    userInteraction();
}
function userInteraction() {
    window.addEventListener("resize", () => {
        canvas.width = innerWidth * 0.65;
        canvas.height = innerHeight * 0.73;
    });
    document.addEventListener("keyup", (event) => {
        if(!isPause){
            if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "d" || event.key == "a") {
                playerMoveDirection = 0;
            }
        }
    });
    document.addEventListener("keydown", (event) => {
        if (!isPause) {
            event.preventDefault();
            if (event.key == " " || event.key == "ArrowUp" || event.key == "w") {
                player.isJump = true;
                if (player.y < player.preY && player.y > (player.preY - player.jumpDistance / 1.5) && player.isFall) {
                    player.jumpDelay = true;
                }
            }
            else if (event.key == "ArrowLeft" || event.key == "a") {
                if (player.x > 30) {
                    playerMoveDirection = -2;
                }
            }
            else if (event.key == "ArrowRight" || event.key == "d") {
                if (player.x < canvas.width - player.width - 30) {
                    playerMoveDirection = 2;
                }
            }
        }
    });
}
function startgame() {
    document.getElementById("playCanvas").style.display = "block";
    document.getElementById("pauseBtn").style.display = "block";
    document.getElementById("Forms").style.display = "none";
    document.getElementById("scoreAndWallet").style.display = "block";
    init();
}
function init() {
    player = new wolf(canvas.width, canvas.height);
    obs = new obsticals(canvas.width, canvas.height);
    coin = new coins(canvas.width, player.preY - player.jumpDistance);

    score = 0;
    difficulty = 1;

    isPause = false;
    player.isJump = false;
    isLose = false;
    obsSpawned = false;
    coinSpawned = false;
    isHitCoin = false;

    document.getElementById("restartForm").style.display = "none";
    updateSkin();
    loop();
}
function loop() {
    if (!isLose) {
        if (!isPause) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            playerJump();
            playerMove();
            spawnObstacle();
            spawnCoin();
            checkHitCoin();
            checkLose();

            drawCoin();
            drawObstacle();
            drawPlayer();
            gainScores();
            increaseDifficulty();
        }
        setTimeout(() => loop(), 10 - difficulty);
    }
    else {
        gameOver();
    }
}
function increaseDifficulty() {
    if(score % 700 == 0 && difficulty < 9){
        difficulty++;
    }
}
function gameOver() {
    document.getElementById("restartForm").style.display = "block";
    document.getElementById("scoreGameOver").textContent = score.toString();
}
function checkHitCoin() {
    if (coin.x <= player.x + player.width && coin.x + coin.resolution >= player.x) { //conflict x-axis
        if (player.y <= coin.y + coin.resolution) { //conflict y-axis
            coinSpawned = false;
            wallet += coin.value;
        }
    }
    playWallet.textContent = wallet.toString();
}
function checkLose() {
    if (obs.x <= player.x + player.width && obs.x + obs.width >= player.x) { //conflict x
        if (player.y + player.height >= obs.y) {
            isLose = true;
            playerStatus = 2;
        }
    }
}
function gainScores() {
    score += 1;
    myScores.textContent = score.toString();
}
function spawnCoin() {
    if (!coinSpawned) {
        let type = Math.round(Math.random() * (1000 + difficulty));
        coin.x = info.width;
        if (type <= 10) {
            coinSpawned = true;
            if (type <= 7) {
                currentCoin = coin.imgYellowCoin;
                coin.y = coin.yYellowCoin;
                coin.resolution = coin.rYellowCoin;
                coin.value = coin.vYellowCoin;
            } else {
                currentCoin = coin.imgBlueCoin;
                coin.y = coin.yBlueCoin;
                coin.resolution = coin.rBlueCoin;
                coin.value = coin.vBlueCoin;
            }
        }
    }
}
function spawnObstacle() {
    if (!obsSpawned) {
        let type = Math.round(Math.random() * (7 + difficulty));
        obsSpawned = true;
        if (type >= 6 && type <= 6 + difficulty) {
            currentObs = obs.imgBear;
            obs.y = obs.yBear;
        }
        else {
            currentObs = obs.imgCactus;
            obs.y = obs.yCactus;
        }
    }
}
function playerMove(){
    player.move(playerMoveDirection);
}
function playerJump() {
    if (player.isJump) {
        if (player.jump()) { //jump animation done
            if (!player.jumpDelay)
                player.isJump = false;
            else player.jumpDelay = false;
            player.g = player.baseG;
            player.isFall = false;
        }
        playerStatus = 1;
    }
    else {
        playerStatus = 0;
    }
}
function drawCoin() {
    if (coinSpawned) {
        if (coin.move(info.width)) { //coin go out of zone
            coinSpawned = false;
            isHitCoin = false;
        }
        context.drawImage(currentCoin, coin.x, coin.y, coin.resolution, coin.resolution);
    }
}
function drawObstacle() {
    if (obsSpawned) {
        if (obs.move(info.width)) { //obs go out of zone
            obsSpawned = false;
        }
        context.drawImage(currentObs, obs.x, obs.y, obs.width, obs.height);
    }
}
function drawPlayer() {
    switch (playerStatus) {
        case 0: context.drawImage(player.img_run, player.x, player.y, player.width, player.height); break;
        case 1: context.drawImage(player.img_jump, player.x, player.y, player.width, player.height); break;
        case 2: context.drawImage(player.img_die, player.x, player.y, player.width, player.height); break;
    }
}
function quitGame() {
    document.getElementById("playCanvas").style.display = "none";
    document.getElementById("pauseBtn").style.display = "none";
    document.getElementById("Forms").style.display = "block";
    document.getElementById("scoreAndWallet").style.display = "none";
    document.getElementById("restartForm").style.display = "none";
}
//#endregion

//#region Interface section
function pause_resumeGame() {
    if (!isPause) {
        document.getElementById("pauseBtn").style.backgroundImage = "url('images/resume_btn.png')"
        isPause = true;
        document.getElementById("pauseForm").style.display = "block";
    }
    else {
        document.getElementById("pauseBtn").style.backgroundImage = "url('images/pause_btn.png')"
        isPause = false;
        document.getElementById("pauseForm").style.display = "none";
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
    storeWallet.textContent = wallet.toString();
    selectSkin(0);
}

function backStore() {
    document.getElementById("storeBtn").checked = false;
}

function playerBuy(slot) {
    if (skinTarget == "wolf") {
        buy_equipSkin(wolfSkin, slot);
        update_BuyBtn(wolfSkin);
    }
    else if (skinTarget == "cactus") {
        buy_equipSkin(cactusSkin, slot);
        update_BuyBtn(cactusSkin);
    }
    else {
        buy_equipSkin(bearSkin, slot);
        update_BuyBtn(bearSkin);
    }
}
function buy_equipSkin(skin, slot) {
    if (skin[slot] == 0) { //buy
        skin[slot] = 1;
        bill(slot);
    }
    else { //Dùng để Equip -> Equipped
        for (let i = 0; i < skin.length; i++) {
            if (skin[i] == 2) {
                skin[i] = 1;
            }
        }
        skin[slot] = 2;
        updateSkin();
    }
}

function updateSkin() {
    for (let i = 0; i < wolfSkin.length; i++) {
        if (wolfSkin[i] == 2) {
            player.loadImg(i + 1);
            break;
        }
    }

    for (let i = 0; i < bearSkin.length; i++) {
        if (bearSkin[i] == 2) {
            obs.loadImageBear(i + 1);
            break;
        }
    }

    for (let i = 0; i < cactusSkin.length; i++) {
        if (cactusSkin[i] == 2) {
            obs.loadImageCactus(i + 1);
            break;
        }
    }
}

function bill(slot) {
    wallet -= skinPrice[slot];
    storeWallet.textContent = wallet.toString();
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
//#endregion
