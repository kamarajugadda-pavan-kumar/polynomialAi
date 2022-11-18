// import controllers
const pageControllers = require("../app/http/controllers/pageControllers");
const isLoggedIn = require("../app/http/middlewares/isUserLoggedIn");

const webRoutes = (app) => {
  app.get("/", pageControllers().home);
  app.get("/upload", isLoggedIn, pageControllers().upload);
  app.get("/view-files", isLoggedIn, pageControllers().viewFiles);
  app.get("/share-file/:fileId", isLoggedIn, pageControllers().shareFile);
};

module.exports = webRoutes;
