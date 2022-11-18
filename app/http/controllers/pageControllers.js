const { get_oauth2Client, searchFile } = require("./readFilesControllers");

function pageController() {
  return {
    home: function (req, res, next) {
      try {
        res.render("home");
      } catch (err) {
        next(new Error(err));
      }
    },
    upload: function (req, res, next) {
      try {
        res.render("upload", {});
      } catch (err) {
        next(new Error(err));
      }
    },
    viewFiles: async function (req, res, next) {
      try {
        let auth = get_oauth2Client(req.session.passport.user.accessToken);
        let data = await searchFile(auth);
        res.render("viewFiles", { data });
      } catch (err) {
        next(new Error(err));
      }
    },
    shareFile: function (req, res, next) {
      try {
        res.render("shareFile", { fileId: req.params.fileId });
      } catch (err) {
        next(new Error(err));
      }
    },
  };
}

module.exports = pageController;
