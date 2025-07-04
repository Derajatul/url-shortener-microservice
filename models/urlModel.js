const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "urls.json");

// Get all URLs from file
const getAllUrls = () => {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading URLs:", error);
    return [];
  }
};

// Save URLs to file
const saveUrls = (urls) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(urls, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving URLs:", error);
    return false;
  }
};

// Find URL by original URL
const findByOriginalUrl = (originalUrl) => {
  const urls = getAllUrls();
  return urls.find((u) => u.original_url === originalUrl);
};

// Find URL by short URL
const findByShortUrl = (shortUrl) => {
  const urls = getAllUrls();
  return urls.find((u) => u.short_url == shortUrl);
};

// Add new URL
const addUrl = (originalUrl) => {
  const urls = getAllUrls();
  const shortUrl = urls.length + 1;

  // Check if URL already exists
  const existingUrl = findByOriginalUrl(originalUrl);
  if (existingUrl) {
    return existingUrl;
  }

  // Add new URL
  const newUrl = { original_url: originalUrl, short_url: shortUrl };
  urls.push(newUrl);

  if (saveUrls(urls)) {
    return newUrl;
  }

  return null;
};

// Validate URL format
const isValidUrl = (url) => {
  const regex = /^(https?:\/\/)?([\w.-]+)(:[0-9]+)?(\/.*)?$/;
  return regex.test(url);
};

module.exports = {
  getAllUrls,
  saveUrls,
  findByOriginalUrl,
  findByShortUrl,
  addUrl,
  isValidUrl,
};
