var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post('/', function(req, res, next) {
    let data = {
        data: {
            msg: ""
        }
    };

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');
    let params =[req.body.email, req.body.username, req.body.password, req.body.birthday]

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        params[2] = hash;
    });

    db.run('INSERT INTO users(email, username, password, birthday) VALUES(?, ?, ?, ?)', params, (err) => {
        if(err) {
            return console.log(err.message); 
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    })
});

module.exports = router;