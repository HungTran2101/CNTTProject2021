const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);

function checkUser(para1, fn) {
    let sql = `select * from user_info where username = ?`;
    pool.query(sql, [para1], function (error, results) {
        if (error) {
            console.log(error.sqlMessage);
        }
        else if (results.length > 0) {
            return fn(false);
        }
        else {
            return fn(true);
        }
    })
}

function setUser(id, username, highscore, money, wolf, bear, cactus){
    let userdata = {
        id: id,
        username: username,
        highscore: highscore,
        money: money,
        wolf: wolf,
        cactus: cactus,
        bear: bear,
    }
    return userdata;
}

module.exports = {
    checkLogin: function (username, password, fn) {
        let sql = 'select * from user_info, skins where user_info.id = skins.user_id and username = ?';
        pool.query(sql, [username, password], function (error, results) {
            if (error) {
                console.log(error.sqlMessage);
            }
            else if (results.length > 0) {
                if (bcrypt.compareSync(password, results[0].password)) {
                    let userdata = setUser(results[0].id, results[0].username, results[0].highscore,results[0].money,results[0].wolf, results[0].bear, results[0].cactus);
                    return fn(userdata);
                }
            }
            return fn(null);
        });
    },
    addUser: function (username, password, fn) {
        let sql = `insert into user_info set username = ?, password = ?, highscore = 0, money = 0`;
        let newUser = false;
        checkUser(username, function (results) {
            newUser = results;
            if (newUser) {
                pool.query(sql, [username, password], function (error) {
                    if (error) {
                        console.log(error.sqlMessage);
                    }
                    return fn(true);
                })
            }
            else {
                return fn(false);
            }
        });
    },
    setupUser(id, username, highscore, money, wolf, bear, cactus){
        return setUser(id, username, highscore, money, wolf, bear, cactus);
    }
};