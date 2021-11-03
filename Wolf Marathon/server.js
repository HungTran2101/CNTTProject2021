// Import
const express = require('express');
const app = express();
// const bodyParser = require('body-parser')
// const cors = require('cors')
const port = 3000;

// const mysql = require('mysql2');
// const con = mysql.createConnection({
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     password: "root123",
//     database: "doan_cntt"
// });
// module.exports = con;


// Static Files
app.use(express.static('public'));

//connect to server
// app.use(bodyParser.json() );       // to support JSON-encoded bodies

// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true})); 
// app.use(cors());


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
})

// Listenning
app.listen(port, () => console.info(`listening on http://localhost:${port}`));

