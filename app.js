const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const indexRoutes = require("./routes/index");
const apiRoutes = require("./routes/api");

const app = express();

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

// Routes configuration
app.use("/", indexRoutes);
app.use("/api", apiRoutes);

module.exports = app;
