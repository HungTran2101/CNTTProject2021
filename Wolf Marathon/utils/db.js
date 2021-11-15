const mysql = require('mysql');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);

function checkUser(para1, fn){
    let sql = `select * from user_info where username = ?`;
    pool.query(sql, [para1], function(error, results){
        if(error){
            console.log(error.sqlMessage);
        }
        else if(results.length > 0){
            return fn(false);
        }
        else{
            return fn(true);
        }
    })
}

module.exports = {
    checkLogin: function (para1, para2, fn) {
        let sql = 'select * from user_info, skins where user_info.id = skins.user_id and username = ? and password = ?';
        pool.query(sql, [para1, para2], function (error, results) {
            if (error) {
                console.log(error.sqlMessage);
            }
            else if (results.length > 0) {
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
            else {
                return fn(null);
            }
        });
    },
    addUser: function (para1, para2, fn) {
        let sql = `insert into user_info set username = ?, password = ?, highscore = 0, money = 0`;
        let newUser = false;
        checkUser(para1, function(results){
            newUser = results;
            console.log('From DB:' + newUser);
        });
        if(newUser){
            pool.query(sql, [para1, para2], function (error, results){
                if(error){
                    console.log(error.sqlMessage);
                }
                return fn(true);
            })
        }
        else {
            return fn(false);
        }
    }
};