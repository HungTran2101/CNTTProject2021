//DoAnCNTT-2021

function initOnload() {
  highscore = getHighScore();
  wallet = getWallet();
  wolfSkin = getWolfSkin();
  cactusSkin = getCactusSkin();
  bearSkin = getBearSkin();

  userInteraction();
}

//xử lí dữ diệu từ nút nhấn bàn phím của người dùng
function userInteraction() {
  window.addEventListener("resize", () => {
    canvas.width = innerWidth * 0.8;
    canvas.height = innerHeight * 0.73;
  });
  document.addEventListener("click", () => {
    soundSelect.play();
  });
  document.addEventListener("keyup", (event) => {
    if (!isPause && !isLose) {
      if (
        event.key == "ArrowLeft" ||
        event.key == "ArrowRight" ||
        event.key == "d" ||
        event.key == "a"
      ) {
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
        if (
          player.y < player.preY &&
          player.y >
            player.preY - player.jumpDistance / 1.5 /*&& player.isFall*/
        ) {
          player.jumpDelay = true;
        }
      } else if (event.key == "ArrowLeft" || event.key == "a") {
        playerMoveDirection = player.speedBackward;
      } else if (event.key == "ArrowRight" || event.key == "d") {
        playerMoveDirection = player.speedForward;
      }
    }
  });
}

//hiển thị giao diện màn chơi
function startgame() {
  document.getElementById("playCanvas").style.display = "block";
  document.getElementById("pauseBtn").style.display = "block";
  document.getElementById("Forms").style.display = "none";
  document.getElementById("scoreAndWallet").style.display = "block";
  init();
}

//khởi tạo hoặc reset các thông số trạng thái ban đầu
function init() {
  player = new wolf(canvas.width, canvas.height);
  obs = new obstacles(canvas.width, canvas.height);
  coin = new coins(canvas.width, player.preY - player.jumpDistance);

  score = 0;
  difficulty = 1;
  background1X = 0;
  background2X = canvas.width;
  playerMoveDirection = 0;

  isPause = false;
  player.isJump = false;
  isLose = false;
  obsSpawned = false;
  coinSpawned = false;

  document.getElementById("highscore").textContent =
    Math.round(highscore).toString();
  document.getElementById("restartForm").style.display = "none";
  updateSkin();
  startBgAnimation();
  loop();
}

//vòng lặp chính của trò chơi
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
  } else {
    gameOver();
  }
}

//tăng độ khó dựa theo điểm của người dùng
function increaseDifficulty() {
  if (score % 700 == 0 && difficulty < 9) {
    difficulty++;
  }
}

//hiển thị giao diện thua cuộc
function gameOver() {
  document.getElementById("restartForm").style.display = "block";
  document.getElementById("scoreGameOver").textContent =
    Math.round(score).toString();
  if (score > highscore) {
    highscore = score;
    setHighScore(score);
  }
  stopBgAnimation();
  setCookies();
  soundLose.play();
}

//kiểm tra và xử lí người dùng chạm tiền thưởng chưa
function checkHitCoin() {
  if (
    coin.x <= player.x + player.width &&
    coin.x + coin.resolution >= player.x
  ) {
    //conflict x-axis
    if (player.y <= coin.y + coin.resolution) {
      //conflict y-axis
      coinSpawned = false;
      wallet += coin.value;
      setWallet(wallet);
      soundCoin.play();
    }
  }
  playWallet.textContent = wallet.toString();
}

//kiểm tra người dùng chạm vật cản chưa
function checkLose() {
  if (obs.x <= player.x + player.width && obs.x + obs.width >= player.x) {
    //conflict x
    if (player.y + player.height >= obs.y) {
      isLose = true;
      playerStatus = 2;
    }
  }
}

//tăng điểm cho người dùng theo mỗi vòng lặp
function gainScores() {
  score += 0.1;
  document.getElementById("score").textContent = Math.round(score).toString();
}

//sinh ngẫu nhiên tiền thưởng trong màn chơi
function spawnCoin() {
  if (!coinSpawned) {
    let type = Math.round(Math.random() * 1000);
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

//sinh ngẫu nhiên vật cản trong màn chơi
function spawnObstacle() {
  if (!obsSpawned) {
    let type = Math.round(Math.random() * (500 + difficulty));
    if (type <= 6 + difficulty) {
      obs.x = canvas.width;
      obsSpawned = true;
      if (type > 5) {
        currentObs = obs.imgBear;
        obs.y = obs.yBear;
      } else {
        currentObs = obs.imgCactus;
        obs.y = obs.yCactus;
      }
    }
  }
}

//xử lí khi người dùng qua trái qua phải
function playerMove() {
  if (player.x <= 0 && playerMoveDirection == player.speedBackward)
    playerMoveDirection = 0;
  if (
    player.x + player.width >= canvas.width &&
    playerMoveDirection == player.speedForward
  )
    playerMoveDirection = 0;
  player.move(playerMoveDirection);
}

//xử lí khi người dùng nhảy
function playerJump() {
  if (player.isJump) {
    if (player.jump()) {
      if (!player.jumpDelay) player.isJump = false;
      else player.jumpDelay = false;
    }
    playerStatus = 1;
  } else {
    playerStatus = 0;
  }
}

//vẽ hình tiền thưởng lên màn chơi
function drawCoin() {
  if (coinSpawned) {
    if (coin.move()) {
      //coin go out of zone
      coinSpawned = false;
    }
    context.drawImage(
      currentCoin,
      coin.x,
      coin.y,
      coin.resolution,
      coin.resolution
    );
  }
}

//vẽ hình vật cản lên màn chơi
function drawObstacle() {
  if (obsSpawned) {
    if (obs.move()) {
      //obs go out of zone
      obsSpawned = false;
    }
    context.drawImage(currentObs, obs.x, obs.y, obs.width, obs.height);
  }
}

//vẽ nhân vật lên màn chơi
function drawPlayer() {
  switch (playerStatus) {
    case 0:
      context.drawImage(
        player.img_run,
        player.x,
        player.y,
        player.width,
        player.height
      );
      break;
    case 1:
      context.drawImage(
        player.img_jump,
        player.x,
        player.y,
        player.width,
        player.height
      );
      break;
    case 2:
      context.drawImage(
        player.img_die,
        player.x,
        player.y,
        player.width,
        player.height
      );
      break;
  }
}

//hiện hoặc tắt giao diện khi tạm ngừng trò chơi
function pause_resumeGame() {
  if (!isLose) {
    if (!isPause) {
      document.getElementById("pauseBtn").style.backgroundImage =
        "url('../images/resume_btn.png')";
      isPause = true;
      document.getElementById("pauseForm").style.display = "block";
      stopBgAnimation();
    } else {
      document.getElementById("pauseBtn").style.backgroundImage =
        "url('../images/pause_btn.png')";
      isPause = false;
      document.getElementById("pauseForm").style.display = "none";
      startBgAnimation();
    }
  }
}

//tắt giao diện màn chơi và hiển thị
function quitGame() {
  document.getElementById("playCanvas").style.display = "none";
  document.getElementById("pauseBtn").style.display = "none";
  document.getElementById("Forms").style.display = "block";
  document.getElementById("scoreAndWallet").style.display = "none";
  document.getElementById("restartForm").style.display = "none";
}

//dừng chuyển động hình nền
function stopBgAnimation() {
  canvas.style.animation = "";
}

//bật chuyển động hình nền
function startBgAnimation() {
  canvas.style.animation = "backgroundAnimation 3.1s infinite linear";
}
//#endregion
