var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello "
        }
    };
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');

    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        "user@example.com",
        "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
        if (err) {
            // returnera error
        }

        // returnera korrekt svar
    });

    res.json(data);
});

module.exports = router;