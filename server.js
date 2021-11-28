//thêm thư viện cần thiết
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./utils/db');

//cấu hình app nodejs
const app = express();
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

// Xử lý get request từ client tới server
app.get('/', function (req, res) {
    let cookies = req.headers.cookie;
    if (cookies !== undefined) {
        if (checkCookiesValid(cookies)) {
            if ('logout' === req.query.action) {
                console.log('logout');

                let user = convertCookiesToUser(cookies);
                db.updateUser(user, function(result){
                    if(result){
                        res.render('main', { data: 'logout' });
                    }
                    else{
                        console.log('logout failed');
                    }
                })
            }
            else {
                console.log('cookies valid');
                let user = convertCookiesToUser(cookies);
                res.render('main', { data: user });
            }
        }
        else {
            console.log('cookies not valid');
            res.render('main', { data: 'logout' });
        }
    }
    else {
        console.log('in default');
        res.render('main', { data: '' });
    }

});

// Xử lý post request từ client tới server
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

// Kiểm tra các giá trị của Cookie
function checkCookiesValid(cookies) {
    let count = 0;
    if (getCookie('id', cookies) != '') {
        count++;
    }
    if (getCookie('username', cookies) != '') {
        count++;
    }
    if (getCookie('highscore', cookies) != '') {
        count++;
    }
    if (getCookie('money', cookies) != '') {
        count++;
    }
    if (getCookie('wolf', cookies) != '') {
        count++;
    }
    if (getCookie('bear', cookies) != '') {
        count++;
    }
    if (getCookie('cactus', cookies) != '') {
        count++;
    }

    return count == 7;
}

// Chuyển định dạng cookie sang object
function convertCookiesToUser(cookies) {
    let userdata = {
        id: getCookie('id', cookies),
        username: getCookie('username', cookies),
        highscore: getCookie('highscore', cookies),
        money: getCookie('money', cookies),
        wolf: getCookie('wolf', cookies),
        bear: getCookie('bear', cookies),
        cactus: getCookie('cactus', cookies)
    }
    return userdata;
}

// Lấy giá trị Cookie trong chuỗi Cookies
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
    return '';
}

// Đặt port để chạy server
const PORT = 3000;
app.listen(process.env.PORT || PORT, () => console.log(`listening on http://localhost:${PORT}/`));