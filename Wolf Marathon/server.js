const express = require('express');
const app = express();
const db = require('./utils/db');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('main', {data: ''});
});

app.post('/', function (req, res) {
    if ('signin' === req.body.formType) {
        let username = req.body.username;
        let password = req.body.password;
        db.checkLogin(username, password,
            function (result) {
                console.log(result);
                if(result != null){
                    res.render('main', {data: result});
                }
                else{
                    res.render('main', {data: 'wrongAcc'});
                }

            });
    }
    else {
        let username = req.body.username;
        let password = req.body.password;
        db.addUser(username, password,
            function (isAdded){
                console.log('From Server:' + isAdded);
                if(isAdded){
                    res.render('main', {data: 'succeed'});
                }
                else{
                    res.render('main', {data: 'failed'});
                }
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.info(`listening on http://localhost:${PORT}/`));