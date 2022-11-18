// ---------------------------------------------
// middleware to handle unknown routes
// ---------------------------------------------

const pageNotFound = (app) => {
  app.use((req, res) => {
    res.status(404).render("404");
  });
};

module.exports = pageNotFound;
