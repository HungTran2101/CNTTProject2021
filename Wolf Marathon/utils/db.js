const mysql = require('mysql');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);

module.exports = {
    checkLogin: function (para1, para2, fn) {
        let sql = 'select * from user_info, skins where user_info.id = skins.user_id and username = ? and password = ?;';
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
    checkRegister: function (table, entity) {
        return new Promise(function (resolve, reject) {
            const sql = `insert into ${table} set ?`;
            pool.query(sql, function (error, results) {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
};