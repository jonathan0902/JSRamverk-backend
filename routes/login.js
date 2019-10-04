var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const bcrypt = require('bcryptjs');
const db = require("../db/database.js");

router.post('/', function(req, res) {
    var params =[req.body.email];

    db.get('SELECT email, password FROM users WHERE email = ?', params, (err, row) => {
        if (err) {
            res.status(400);
            return;
        }

        if (row == null) {
            res.status(400);
            res.json({ "message": 'Authentication Failed!' });
            return;
        }

        bcrypt.compare(req.body.password, row.password, function(err) {
            if (err) {
                return;
            }
        });

        const payload = { email: req.body.email };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

        res.setHeader('x-access-token', token);

        res.status(200).json({
            success: true,
            message: 'Authentication successful!',
            token: token
        });
    });
});

module.exports = router;
