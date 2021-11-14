//#region Interface section
function pause_resumeGame() {
    if (!isLose) {
        if (!isPause) {
            document.getElementById("pauseBtn").style.backgroundImage = "url('../images/resume_btn.png')"
            isPause = true;
            document.getElementById("pauseForm").style.display = "block";
        }
        else {
            document.getElementById("pauseBtn").style.backgroundImage = "url('../images/pause_btn.png')"
            isPause = false;
            document.getElementById("pauseForm").style.display = "none";
        }
    }
}

function toggleMusic() {
    if (!isMusic) {
        music.play();
        isMusic = true;
        document.getElementById("soundBtn").style.backgroundImage = "url('../images/sound_on.png')"
    } else if (isMusic) {
        music.pause();
        isMusic = false;
        document.getElementById("soundBtn").style.backgroundImage = "url('../images/sound_off.png')"
    }
}

function loginOption(message) {
    document.getElementById("passInput").value = "";
    document.getElementById("confPassInput").value = "";
    let login = document.getElementById("loginBtn");
    if (login.checked) {
        document.getElementById("main").style.opacity = 1;
        login.checked = false;
    } else {
        document.getElementById("main").style.opacity = 0.1;
        document.getElementById("signUpBtn").checked = false;
        document.getElementById("chbxConfPass").checked = false;
        document.getElementById("signInBtn").innerHTML = "Sign in";
        document.getElementById("formType").value = "signin";
        document.getElementById("alert").innerHTML = message;
        login.checked = true;
    }
}

function signUpOption(message) {
    document.getElementById("passInput").value = "";
    let signup = document.getElementById("signUpBtn");
    if (signup.checked) {
        document.getElementById("main").style.opacity = 1;
        signup.checked = false;
    } else {
        document.getElementById("main").style.opacity = 0.1;
        document.getElementById("chbxConfPass").checked = true;
        document.getElementById("loginBtn").checked = false;
        document.getElementById("signInBtn").innerHTML = "Sign up";
        document.getElementById("formType").value = "signup";
        document.getElementById("alert").innerHTML = message;
        signup.checked = true;
    }
}
function validateInput(login, username, password, confPass) {
    let alertText = document.getElementById("alert");
    if (username == "") {
        alertText.innerHTML = "Please enter your username";
        return false;
    }
    else if (password == "") {
        alertText.innerHTML = "Please enter your password";
        return false;
    }
    else if (!login.checked) {
        if (confPass == "") {
            alertText.innerHTML = "Please confirm your password";
            return false;
        }
        else if (password != confPass) {
            alertText.innerHTML = "Confirm password does not match";
            return false;
        }
    }
    return true;
}
function login() {
    let login = document.getElementById("loginBtn");
    let username = document.getElementById("userInput").value;
    let password = document.getElementById("passInput").value;
    let confPass = document.getElementById("confPassInput").value;
    if (validateInput(login, username, password, confPass)) {
        document.getElementById("loginForm").submit();
        // document.querySelector("#menu div").style.display = "block";
        // document.querySelector("#menu h3").style.display = "none";
        // document.getElementById("playerInfo").style.display = "flex";
        // document.getElementById("navigation").style.display = "none";
        // document.querySelector(".welcome").innerHTML = "Welcome, " + username;
    }
}
function cancelLogin() {
    document.getElementById("loginBtn").checked = false;
    document.getElementById("signUpBtn").checked = false;
    document.getElementById("main").style.opacity = 1;
}
function loadData(userdata) {
    userID = Number(userdata.id);
    userName = userdata.username;
    highscore = Number(userdata.highscore);
    wallet = Number(userdata.money);
    for (let i = 0; i < 3; i++) {
        wolfSkin[i] = Number(userdata.wolf[i]);
        cactusSkin[i] = Number(userdata.cactus[i]);
        bearSkin[i] = Number(userdata.bear[i]);
    }
}
function loginSuccess(userdata) {
    loadData(userdata);
    document.querySelector("#menu div").style.display = "block";
    document.querySelector("#menu h3").style.display = "none";
    document.getElementById("playerInfo").style.display = "flex";
    document.getElementById("navigation").style.display = "none";
    document.querySelector(".welcome").innerHTML = "Welcome, " + userdata.username;
}
function loginFailed() {

}
function logout() {
    document.querySelector("#menu div").style.display = "none";
    document.querySelector("#menu h3").style.display = "block";
    document.getElementById("playerInfo").style.display = "none";
    document.getElementById("navigation").style.display = "flex";
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
        player.loadImg(0);
    }

    for (let i = 0; i < bearSkin.length; i++) {
        if (bearSkin[i] == 2) {
            obs.loadImageBear(i + 1);
            break;
        }
        obs.loadImageBear(0);
    }

    for (let i = 0; i < cactusSkin.length; i++) {
        if (cactusSkin[i] == 2) {
            obs.loadImageCactus(i + 1);
            break;
        }
        obs.loadImageCactus(0);
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
        slots[0].src = "../images/wolf_jump1.png";
        slots[1].src = "../images/wolf_jump2.png";
        slots[2].src = "../images/wolf_jump3.png";
        update_BuyBtn(wolfSkin);
        skinTarget = "wolf";
    }
    else if (option == 1) { //cactus
        btnWolf.classList.remove("active");
        btnCactus.classList.add("active");
        btnBear.classList.remove("active");
        slots[0].src = "../images/cactus1.png";
        slots[1].src = "../images/cactus2.png";
        slots[2].src = "../images/cactus3.png";
        update_BuyBtn(cactusSkin);
        skinTarget = "cactus";
    }
    else if (option == 2) { //bear
        btnWolf.classList.remove("active");
        btnCactus.classList.remove("active");
        btnBear.classList.add("active");
        slots[0].src = "../images/bear1.png";
        slots[1].src = "../images/bear2.png";
        slots[2].src = "../images/bear3.png";
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