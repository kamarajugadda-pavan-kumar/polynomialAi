// -------------------------------------------
// assets
// -------------------------------------------
const assets = (app, express) => {
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = assets;
