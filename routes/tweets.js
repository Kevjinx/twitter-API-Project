const express = require("express");
const morgan = require("morgan");
const { environment } = require('../config');
const router = express.Router();
const db = require('../db/models');
const { Tweet } = db;
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get("/tweets", asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll()

    res.json({
      tweets
    });
}));

router.get("/tweets/:id(\\d+)", asyncHandler(async(req, res) => {
    const tweetId = req.params.id;

    const tweet = await Tweet.findByPk(tweetId);

    res.json({
        tweet
    });
}));


module.exports = router
