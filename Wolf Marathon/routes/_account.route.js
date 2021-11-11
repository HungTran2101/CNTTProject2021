const express = require('express');
const userModel = require('../model/user.model');
const db = require('../utils/db');
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');
const router = express.Router();

router.get('/login', function(req, res){
    res.render('_partials/login');
})

router.post('/login', async function(req, res){
    const password_hash = bcrypt.hashSync(req.body.password, 8);
    const entity = {
        username: req.body.username,
        password: password_hash,
        confirmPass: req.body.confirm
    }
    await userModel.add(entity);
    res.render('_partials/login');
})

module.exports = router;