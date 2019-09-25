var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/update/',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => updateReport(res, req.body));

router.post('/add/',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addReport(res, req.body));

router.get('/', function(req, res, next) {
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');
    
    db.all('SELECT id FROM report', (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "id": row
        })
    })
});

router.get('/auth/',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => authUser(res, req.body));

    function checkToken(req, res, next) {
        const token = req.headers['x-access-token'];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)  => {
            if(err){
                //If error send Forbidden (403)
                console.log(err)
                console.log('ERROR: Could not connect to the protected route');
            } else {
                //If token is successfully verified, we can send the autorized data 
                next();
            }
            
        });
    }

    function updateReport(res, req) {
        let data = {
            data: {
                msg: ""
            }
        };
    
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('./db/texts.sqlite');
        var params =[req.tx, req.id]
    
        db.run('UPDATE report SET tx = ? WHERE id = ?', params, (err) => {
            if(err) {
                return console.log(err.message); 
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        })
    }

    function addReport(res, req) {
        let data = {
            data: {
                msg: ""
            }
        };
    
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('./db/texts.sqlite');
        var params =[req.tx]
    
        db.run('INSERT INTO report (tx) VALUES (?)', params, (err) => {
            if(err) {
                return console.log(err.message); 
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        })
    }

    function authUser(res, req) {
        console.log("tesafasfsafasfa")
            res.json({
                "message": "success",
                "data": true,
            })
    }

module.exports = router;