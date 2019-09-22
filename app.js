const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const index = require('./routes/index');
const hello = require('./routes/hello');
const week1 = require('./routes/week1');
const register = require('./routes/register');
const report = require('./routes/report');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");

var router = express.Router();
const app = express();
const port = 8333;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use('/', index);
app.use('/hello', hello);
app.use('/reports/week', week1);
app.use('/register', register);
app.use('/report', report);

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

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

app.listen(port, () => console.log(`Example API listening on port ${port}!`));