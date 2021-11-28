//DoAnCNTT-2021

var canvas = document.getElementById("playCanvas");
var context = canvas.getContext("2d");
var menu = document.getElementById("menu");
var info = menu.getBoundingClientRect();
var buyBtn = document.getElementsByClassName("buyBtn");
var textBuyBtn = document.getElementsByName("textBuyBtn");
var buyIcon = document.getElementsByClassName("buyIcon");
var storeWallet = document.getElementById("wallet");
var playWallet = document.getElementById("playWallet");
var music = document.getElementById("music");
var soundJump = document.getElementById("soundJump");
var soundCoin = document.getElementById("soundCoin");
var soundLose = document.getElementById("soundLose");
var soundSelect = document.getElementById("soundSelect");

canvas.width = innerWidth * 0.65;
canvas.height = innerHeight * 0.73;
music.volume = 0.2;
soundCoin.volume = 0.1;
soundJump.volume = 0.1;
soundLose.volume = 0.5;
soundSelect.volume = 0.1;

var player = new wolf(canvas.width, canvas.height); //(info.height * 0.570);
var obs = new obsticals(canvas.width, canvas.height); //(info.width, info.height * 0.611);
var coin = new coins(canvas.width, player.preY - player.jumpDistance);

var score = 0;
var highscore = 0;
var wallet = 70000;
var difficulty = 1;
var playerStatus = 0; //0-run 1-jump 2-die
var skinPrice = [200, 400, 600];
var wolfSkin = [0, 0, 0]; // 0-for sell 1-equip 2-equipped
var cactusSkin = [0, 0, 0];
var bearSkin = [0, 0, 0];
var skinTarget = "wolf";
var currentObs = null;
var currentCoin = null;
var playerMoveDirection = 0; //0 - not moving   10 - move right   -10 - move left

var obsSpawned = false;
var coinSpawned = false;
var isPause = false;
var isMusic = false;
var isLose = true;
var userName = "";
var userID = null;