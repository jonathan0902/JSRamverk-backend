/**
 * Connect to the database and search using a criteria.
 */
"use strict";

// MongoDB
const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/jhellberg";

// Express server
const express = require("express");
var router = express.Router();

router.post('/save/', async (request, response) => {
    try {
        let res = await insertInCollection(dsn, "chat", {}, {}, 0, request.body);

        response.json(res);
    } catch (err) {
        response.json(err);
    }
});

router.get('/get/', async (request, response) => {
    try {
        let res = await findInCollection(dsn, "chat", {}, {}, 3);

        response.json(res);
    } catch (err) {
        response.json(err);
    }
});

/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).sort({_id:-1}).limit(limit).toArray();

    await client.close();

    return res.reverse();
}

async function insertInCollection(dsn, colName, criteria, projection, limit, req) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.insertOne({username: req.username, date: req.date, text: req.text});

    await client.close();

    return req;
}

module.exports = router;
