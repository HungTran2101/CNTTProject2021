const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);

function checkUser(para1, fn) {
    let sql = 'select * from user_info where username = ?';
    pool.query(sql, [para1], function (error, results) {
        if (error) {
            console.log(error.sqlMessage);
            throw error;
        }
        else if (results.length > 0) {
            return fn(false);
        }
        else {
            return fn(true);
        }
    })
}

module.exports = {
    checkLogin: function (username, password, fn) {
        let sql = 'select * from user_info, skins where user_info.id = skins.user_id and username = ?';
        pool.query(sql, [username, password], function (error, results) {
            if (error) {
                console.log(error.sqlMessage);
                throw error;
            }
            else if (results.length > 0) {
                if (bcrypt.compareSync(password, results[0].password)) {
                    let userdata = {
                        id: results[0].id,
                        username: results[0].username,
                        highscore: results[0].highscore,
                        money: results[0].money,
                        wolf: results[0].wolf,
                        cactus: results[0].cactus,
                        bear: results[0].bear,
                    }
                    return fn(userdata);
                }
            }
            return fn(null);
        });
    },
    addUser: function (username, password, fn) {
        let sql = 'insert into user_info set username = ?, password = ?, highscore = 0, money = 0';
        checkUser(username, function (results) {
            if (results) {
                pool.query(sql, [username, password], function (error) {
                    if (error) {
                        console.log(error.sqlMessage);
                        throw error;
                    }
                    else
                        return fn(true);
                })
            }
            else {
                return fn(false);
            }
        });
    },
    updateUser(user, fn) {
        let sql = 'update user_info, skins set highscore = ?, money = ?, wolf=?, cactus=?,bear=? where id=user_id and id=?'
        pool.query(sql,[user.highscore, user.money, user.wolf, user.cactus, user.bear, user.id], function (error, result){
            if(error){
                console.log(error.sqlMessage);
                throw error;
            }
            else if(result.affectedRows){
                fn(true);
            }
            else{
                fn(false);
            }
        })
    }
};