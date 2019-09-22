var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const cors = require('cors');
const app = express();

app.use(cors());

router.post('/', function(req, res, next) {
    let data = {
        data: {
            msg: ""
        }
    };

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');
    var params =[req.body.email, req.body.password]

    db.get('SELECT email FROM users WHERE email = ? AND password = ?', params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

        const payload = { email: req.body.email };
        const secret = process.env.JWT_SECRET;

        const token = jwt.sign(payload, secret, { expiresIn: '1h'});
        res.setHeader('x-access-token', token);

        res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
        })
    })
});

module.exports = router;