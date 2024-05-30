function getHighScore() {
  return Number(localStorage.getItem("highScore")) || 0;
}

function setHighScore(value) {
  return localStorage.setItem("highScore", value);
}

function getWallet() {
  return Number(localStorage.getItem("wallet")) || 0;
}

function setWallet(value) {
  return localStorage.setItem("wallet", value);
}

function getWolfSkin() {
  const wolfSkin = localStorage.getItem("wolfSkin");
  if (wolfSkin) {
    return JSON.parse(wolfSkin);
  }
  return [0, 0, 0];
}

function setWolfSkin(value) {
  return localStorage.setItem("wolfSkin", JSON.stringify(value));
}

function getCactusSkin() {
  const cactusSkin = localStorage.getItem("cactusSkin");
  if (cactusSkin) {
    return JSON.parse(cactusSkin);
  }
  return [0, 0, 0];
}

function setCactusSkin(value) {
  return localStorage.setItem("cactusSkin", JSON.stringify(value));
}

function getBearSkin() {
  const bearSkin = localStorage.getItem("bearSkin");
  if (bearSkin) {
    return JSON.parse(bearSkin);
  }
  return [0, 0, 0];
}

function setBearSkin(value) {
  return localStorage.setItem("bearSkin", JSON.stringify(value));
}
