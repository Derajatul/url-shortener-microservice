require("dotenv").config();
const app = require("./app");

// Basic Configuration
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
