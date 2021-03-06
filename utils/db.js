//thêm thư viện cần thiết
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');

//tạo pool
const pool = mysql.createPool(config.mysql);

//kiểm tra user có tồn tại chưa
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

function lastUserId(fn){
    let sql = 'select max(id) as last_id from user_info';
    pool.query(sql, function (error, results) {
        if (error) {
            console.log(error.sqlMessage);
            throw error;
        }
        return fn(results[0].last_id)
    })
}

module.exports = {
    //kiểm tra login thành công hay không
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

    //thêm user mới vào database
    addUser: function (username, password, fn) {
        let addUser = 'insert into user_info set username = ?, password = ?, highscore = 0, money = 0';
        let addSkin = "insert into skins set user_id = ?, wolf='000', cactus='000', bear='000'";
        checkUser(username, function (results) {
            if (results) {
                pool.query(addUser, [username, password], function (error) {
                    if (error) {
                        console.log(error.sqlMessage);
                        throw error;
                    }
                    let user_id;
                    lastUserId(function (results){
                        user_id = results;
                        pool.query(addSkin, [user_id], function (error){
                            if (error) {
                                console.log(error.sqlMessage);
                                throw error;
                            }
                            return fn(true);
                        })
                    })
                })
            }
            else {
                return fn(false);
            }
        });
    },

    //cập nhật dữ liệu của user
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