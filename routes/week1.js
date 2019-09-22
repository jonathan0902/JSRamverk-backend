var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    let data = {
        data: {
            msg: ""
        }
    };
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');

    db.get('SELECT tx FROM report WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row.tx
          })
    })
});

module.exports = router;