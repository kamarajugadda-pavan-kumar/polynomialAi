const passport = require("passport");
const multer = require("multer");
const upload = multer();
const {
  get_oauth2Client,
  shareFile,
} = require("../app/http/controllers/shareFileController");

const apiRoutes = (app) => {
  app.use(require("../app/http/controllers/uploadControllers"));

  app.get("/login/federated/google", passport.authenticate("google"));

  app.get(
    "/oauth2/redirect/google",
    passport.authenticate("google", {
      successRedirect: "/upload",
      failureRedirect: "/",
    })
  );

  app.post("/share-file", upload.any(), async (req, res) => {
    const { body } = req;
    const ACCESS_TOKEN = req.session.passport.user.accessToken;
    console.log(body);
    const auth = get_oauth2Client(ACCESS_TOKEN);
    let response = await shareFile(auth, body.fileId, body.email, "gmail.com");
    console.log(response);
    res.status(200).send("file shared");
  });

  app.get("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};

module.exports = apiRoutes;
