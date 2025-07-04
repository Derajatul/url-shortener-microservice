# URL Shortener Microservice

This is a URL Shortener Microservice built with Express.js using MVC (Model-View-Controller) architecture with functional programming approach.

## Features

- Shorten long URLs into short, manageable links
- Redirect short URLs to original URLs
- JSON-based data storage
- RESTful API endpoints
- URL validation
- Duplicate URL handling

## Architecture

This project follows the MVC pattern with functional programming:

```text
├── index.js              # Main entry point
├── app.js                # Express app configuration
├── models/
│   └── urlModel.js       # Data layer (functional approach)
├── controllers/
│   └── urlController.js  # Business logic (functional approach)
├── routes/
│   ├── index.js         # Main routes
│   └── api.js           # API routes
├── views/
│   └── index.html       # Frontend view
├── public/
│   └── style.css        # Styles
└── urls.json            # Data storage file
```

## API Endpoints

### GET /api/hello

Returns a greeting message.

**Response:**

```json
{
  "greeting": "hello API"
}
```

### POST /api/shorturl

Create a short URL from a long URL.

**Request Body:**

```json
{
  "url": "https://example.com"
}
```

**Response (Success):**

```json
{
  "original_url": "https://example.com",
  "short_url": 1
}
```

**Response (Error):**

```json
{
  "error": "invalid url"
}
```

### GET /api/shorturl/:shortUrl

Redirect to the original URL.

**Parameters:**

- `shortUrl`: The short URL ID

**Response:** Redirects to the original URL or returns an error if not found.

## Installation & Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file (optional, or copy from `sample.env`)
4. Start the server:

   ```bash
   npm start
   ```

5. The server will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter a URL in the form to get a shortened version
3. Use the returned short URL to redirect to the original URL

## Data Storage

URLs are stored in a local `urls.json` file with the following structure:

```json
[
  {
    "original_url": "https://example.com",
    "short_url": 1
  }
]
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Body-parser** - Parse incoming request bodies
- **CORS** - Cross-Origin Resource Sharing
- **File System (fs)** - Local JSON file storage

## Project Structure Details

### Models (`models/urlModel.js`)

Contains all data-related functions using functional programming:

- `getAllUrls()` - Retrieve all URLs from storage
- `saveUrls(urls)` - Save URLs to storage
- `findByOriginalUrl(url)` - Find URL by original URL
- `findByShortUrl(shortUrl)` - Find URL by short URL
- `addUrl(originalUrl)` - Add new URL entry
- `isValidUrl(url)` - Validate URL format

### Controllers (`controllers/urlController.js`)

Contains business logic functions:

- `getHello(req, res)` - Handle hello API endpoint
- `createShortUrl(req, res)` - Handle URL shortening
- `redirectShortUrl(req, res)` - Handle URL redirection

### Routes

- `routes/index.js` - Main application routes (home page)
- `routes/api.js` - API endpoints routing

## Original Project

This project is based on the freeCodeCamp URL Shortener Microservice challenge. Instructions for the original project can be found at [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice).
