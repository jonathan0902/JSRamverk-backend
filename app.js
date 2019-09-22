const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const index = require('./routes/index');
const hello = require('./routes/hello');
const week1 = require('./routes/week1');
const register = require('./routes/register');
const report = require('./routes/report');
const login = require('./routes/login');
const bodyParser = require("body-parser");

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
app.use('/login', login);

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