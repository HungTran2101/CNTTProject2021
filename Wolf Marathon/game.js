//DoAnCNTT-2021

//#region game section
function loadData() {
    userInteraction();
}
function userInteraction() {
    window.addEventListener("resize", () => {
        canvas.width = innerWidth * 0.65;
        canvas.height = innerHeight * 0.73;
    });
    document.addEventListener("click", () => {
        soundSelect.play();
    })
    document.addEventListener("keyup", (event) => {
        if (!isPause && !isLose) {
            if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "d" || event.key == "a") {
                playerMoveDirection = 0;
            }
        }
    });
    document.addEventListener("keydown", (event) => {
        if (!isPause && !isLose) {
            event.preventDefault();
            if (event.key == " " || event.key == "ArrowUp" || event.key == "w") {
                soundJump.play();
                player.isJump = true;
                if (player.y < player.preY && player.y > (player.preY - player.jumpDistance / 1.5) /*&& player.isFall*/) {
                    player.jumpDelay = true;
                }
            }
            else if (event.key == "ArrowLeft" || event.key == "a") {
                if (player.x > 0) {
                    playerMoveDirection = -2;
                }
                else {
                    playerMoveDirection = 0;
                }
            }
            else if (event.key == "ArrowRight" || event.key == "d") {
                if (player.x + player.width < canvas.width) {
                    playerMoveDirection = 2;
                }
                else {
                    playerMoveDirection = 0;
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
    background1X = 0;
    background2X = canvas.width;

    isPause = false;
    player.isJump = false;
    isLose = false;
    obsSpawned = false;
    coinSpawned = false;

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

            //drawBackground();
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
    if (score % 700 == 0 && difficulty < 9) {
        difficulty++;
    }
}
function gameOver() {
    document.getElementById("restartForm").style.display = "block";
    document.getElementById("scoreGameOver").textContent = score.toString();
    soundLose.play();
}
function checkHitCoin() {
    if (coin.x <= player.x + player.width && coin.x + coin.resolution >= player.x) { //conflict x-axis
        if (player.y <= coin.y + coin.resolution) { //conflict y-axis
            coinSpawned = false;
            wallet += coin.value;
            soundCoin.play();
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
        let type = Math.round(Math.random() * (1000));
        coin.x = canvas.width;
        if (type <= 10) {
            coinSpawned = true;
            if (type <= 8) {
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
        let type = Math.round(Math.random() * (500 + difficulty));
        if (type <= 6 + difficulty) {
            obs.x = canvas.width;
            obsSpawned = true;
            if (type > 5) {
                currentObs = obs.imgBear;
                obs.y = obs.yBear;
            }
            else {
                currentObs = obs.imgCactus;
                obs.y = obs.yCactus;
            }
        }
    }
}
function playerMove() {
    player.move(playerMoveDirection);
}
function playerJump() {
    if (player.isJump) {
        if (player.jump()) {
            if (!player.jumpDelay)
                player.isJump = false;
            else
                player.jumpDelay = false;
        }
        playerStatus = 1;
    }
    else {
        playerStatus = 0;
    }
}
function drawBackground(){
    context.drawImage(backgroundImage, background1X - 10, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, background2X - 10, 0, canvas.width, canvas.height);
    background1X -= 1;
    background2X -= 1;
    if(background1X < -canvas.width){
        background1X = canvas.width;
    }
    else if(background2X < -canvas.width){
        background2X = canvas.width;
    }
}
function drawCoin() {
    if (coinSpawned) {
        if (coin.move()) { //coin go out of zone
            coinSpawned = false;
        }
        context.drawImage(currentCoin, coin.x, coin.y, coin.resolution, coin.resolution);
    }
}
function drawObstacle() {
    if (obsSpawned) {
        if (obs.move()) { //obs go out of zone
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
