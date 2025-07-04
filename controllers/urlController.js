const urlModel = require("../models/urlModel");

// Handle API hello endpoint
const getHello = (req, res) => {
  res.json({ greeting: "hello API" });
};

// Handle creating short URL
const createShortUrl = (req, res) => {
  const url = req.body.url;

  // Validate URL
  if (!urlModel.isValidUrl(url)) {
    return res.json({ error: "invalid url" });
  }

  // Try to add URL
  const result = urlModel.addUrl(url);

  if (result) {
    res.json({
      original_url: result.original_url,
      short_url: result.short_url,
    });
  } else {
    res.json({ error: "Error saving URL" });
  }
};

// Handle redirecting short URL
const redirectShortUrl = (req, res) => {
  const shortUrl = req.params.shortUrl;

  // Find URL by short URL
  const urlEntry = urlModel.findByShortUrl(shortUrl);

  if (!urlEntry) {
    return res.json({ error: "No URL found for the given short URL" });
  }

  res.redirect(urlEntry.original_url);
};

module.exports = {
  getHello,
  createShortUrl,
  redirectShortUrl,
};
