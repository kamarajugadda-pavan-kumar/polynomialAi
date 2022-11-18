require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const passport = require("passport");
const session = require("express-session");
const MongoDbStore = require("connect-mongo");

// -------------------------------------------
// assets
// -------------------------------------------
require("./app/config/assets")(app, express);

// // session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_URL,
      dbName: "polynomialai",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours time
  })
);

// passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// global middleware
app.use((req, res, next) => {
  // console.log(req.session, req.user);
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// -------------------------------------------
// set template engine
// -------------------------------------------
require("./app/config/ejsConfig")(app);

// -------------------------------------------
// Database connection
// -------------------------------------------
const url = process.env.MONGO_CONNECTION_URL;
let clientPromise = mongoose
  .connect(url)
  .then(() => {
    console.log("database connection successful");
  })
  .catch((err) => {
    console.log("database connection failed");
  });

// -------------------------------------------
// pass the express app object to web.js and api.js to create routes
// -------------------------------------------
require("./routes/web")(app);
require("./routes/api")(app);

// ---------------------------------------------
// middleware to handle unknown routes
// ---------------------------------------------
require("./app/http/middlewares/pageNotFound")(app);

// ---------------error handling middle ware-----------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//-----------------Starting server----------------------------
const server = app.listen(3000, () => {
  console.log(`app is running on port 3000 and processId ${process.pid}`);
});
//-----------------Handling SIGINT----------------------------
process.on("SIGINT", () => {
  console.log("SIGINT received");
  server.close(() => {
    console.log("server is closed");
    console.log("closing mongoose connection");
    // mongoose.connection.close(false, () => {
    process.exit(0);
    // });
  });
});

//-----------------Handling SIGTERM----------------------------
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  server.close(() => {
    console.log("server is closed");
    // mongoose.connection.close(false, () => {
    process.exit(0);
    // });
  });
});
