require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", function (req, res) {
  const url = req.body.url;
  const regex = /^(https?:\/\/)?([\w.-]+)(:[0-9]+)?(\/.*)?$/;
  if (!regex.test(url)) {
    return res.json({ error: "invalid url" });
  }
  const shortUrl = Math.floor(Math.random() * 10000);
  // cek if urls.json already exists
  const fs = require("fs");
  const filePath = "./urls.json";
  let urls = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    urls = JSON.parse(data);
  }
  // check if url already exists
  const existingUrl = urls.find((u) => u.original_url === url);
  if (existingUrl) {
    return res.json({ original_url: url, short_url: existingUrl.short_url });
  }
  // add new url
  urls.push({ original_url: url, short_url: shortUrl });
  fs.writeFileSync(filePath, JSON.stringify(urls, null, 2));

  res.json({ original_url: url, short_url: shortUrl });
});
app.get("/api/shorturl/:shortUrl", function (req, res) {
  const shortUrl = req.params.shortUrl;
  const fs = require("fs");
  const filePath = "./urls.json";
  if (!fs.existsSync(filePath)) {
    return res.json({ error: "No URL found for the given short URL" });
  }
  const data = fs.readFileSync(filePath, "utf8");
  const urls = JSON.parse(data);
  const urlEntry = urls.find((u) => u.short_url == shortUrl);
  if (!urlEntry) {
    return res.json({ error: "No URL found for the given short URL" });
  }
  res.redirect(urlEntry.original_url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
