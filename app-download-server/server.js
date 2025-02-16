const express = require("express");

const app = express();

// Serve static files from public/
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/alvana.apk"); // Redirects to direct download
});

module.exports = app;
