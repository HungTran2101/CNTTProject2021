const express = require('express');
var exphbs  = require('express-handlebars');

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.engine('hbs', exphbs({
    layoutsDir: 'views/_layouts',
    defaultLayout: 'main.hbs',
    partialsDir: 'views/_partials',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
})

const routeAccount = require('../Wolf Marathon/routes/_account.route');
app.use('/login', routeAccount);

const PORT = 3000;
app.listen(PORT, () => console.info(`listening on http://localhost:${PORT}`));