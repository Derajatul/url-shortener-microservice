const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

// API hello endpoint
router.get("/hello", urlController.getHello);

// Create short URL
router.post("/shorturl", urlController.createShortUrl);

// Redirect short URL
router.get("/shorturl/:shortUrl", urlController.redirectShortUrl);

module.exports = router;
