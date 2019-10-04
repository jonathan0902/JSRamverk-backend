var express = require('express');
var router = express.Router();
const db = require("../db/database.js");

router.get('/:id', function(req, res) {
    db.get('SELECT tx FROM report WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row.tx
        });
    });
});

module.exports = router;
