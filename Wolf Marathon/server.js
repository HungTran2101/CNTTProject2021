const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./utils/db');

const app = express();
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    let cookies = req.headers.cookie;
    if(cookies !== undefined){
        if ('logout' === req.query.action) {
            console.log('in logout');
            res.render('main', { data: 'logout' });
        }
        else{
            console.log('in else logout');
            let id = getCookie('id',cookies);
            let username = getCookie('username',cookies);
            let highscore = getCookie('highscore',cookies);
            let money = getCookie('money',cookies);
            let wolf = getCookie('wolf',cookies);
            let bear = getCookie('bear',cookies);
            let cactus = getCookie('cactus',cookies);

            let result = db.setupUser(id, username, highscore, money, wolf, bear, cactus);
            res.render('main', { data: result });
        }
    }
    else{
        console.log('in default');
        res.render('main', { data: '' });
    }
    
});

app.post('/', function (req, res) {
    if ('signin' === req.query.action) {
        console.log('in signin');
        let username = req.body.username;
        let password = req.body.password;
        db.checkLogin(username, password,
            function (result) {
                if (result != null) {
                    res.render('main', { data: result });
                }
                else {
                    res.render('main', { data: 'wrongAcc' });
                }

            });
    }
    else if ('signup' === req.query.action) {
        console.log('in signup');
        let username = req.body.username;
        let password = req.body.password;
        let password_hash = bcrypt.hashSync(password, 8);
        db.addUser(username, password_hash,
            function (isAdded) {
                if (isAdded) {
                    res.render('main', { data: 'succeed' });
                }
                else {
                    res.render('main', { data: 'failed' });
                }
            });
    }
});

function getCookie(cname, cookies) {
    let name = cname + "=";
    let ca = cookies.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const PORT = 3000;
app.listen(PORT, () => console.info(`listening on http://localhost:${PORT}/`));