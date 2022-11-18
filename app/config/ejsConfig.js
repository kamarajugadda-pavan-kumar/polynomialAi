const expressLayout = require("express-ejs-layouts");
const path = require("path");
const ejs = require("ejs");

const ejsConfig = (app) => {
  app.use(expressLayout);
  app.set("views", path.join(__dirname, "../../resources/views"));
  app.set("view engine", "ejs");
};

module.exports = ejsConfig;
