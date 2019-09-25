var express = require('express');
const jwt = require('jsonwebtoken');
const unused = require('dotenv').config();
var router = express.Router();

router.post('/', function(req, res, next) {
    let data = {
        data: {
            msg: ""
        }
    };

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');
    var params =[req.body.email]
    const bcrypt = require('bcryptjs');

    db.get('SELECT email, password FROM users WHERE email = ?', params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

        if(row == null) {
            res.json({"message":'Authentication Failed!'});
            return;
        }

        bcrypt.compare(req.body.password, row.password, function(err, res) {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            
            if(res) {
                const payload = { email: req.body.email };
                const secret = process.env.JWT_SECRET;
        
                const token = jwt.sign(payload, secret, { expiresIn: '1h'});
                res.setHeader('x-access-token', token);
        
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                })  
            }
        });

    })
});

module.exports = router;