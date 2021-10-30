//Install express server
const express = require("express");
const path = require("path");
const app = express();
//Header secure
const helmet = require('helmet');
app.use(helmet.noSniff());
app.use(helmet.frameguard());
//Serve only the static files form the dist directory
// Serve only the static files form the dist directory
app.use(express.static("./dist/artmais-frontend"));
app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/artmais-frontend/" })
);
// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 4200;
app.listen(PORT, function () {});