// const mysql = require('mysql2');
// const con = mysql.createConnection({
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     password: "root123",
//     database: "doan_cntt"
// });

// function person() {};
// person.prototype.getdata= function(callback)
// {
//     con.query("select * from user_info",function(err,rows)
//     {
//         callback(rows);
//     });
// }
// module.exports = person;

// connection.connect(function(err) {
//     if (err) throw err;
//     var sql = "SELECT * FROM user_info";
//     connection.query(sql, function(err, results) {
//         if (err) throw err;
//         console.log(results);
//     })
// });

// connection.end(function (error) {
//     if (!!error) {
//         console.log(error);
//     }
//     else {
//         console.log('Closed!:(');
//     }
// });

// module.exports = connection;