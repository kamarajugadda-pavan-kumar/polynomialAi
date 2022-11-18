// const { google } = require("googleapis");
// const path = require("path");
// const fs = require("fs");
// var mime = require("mime-types");

// const ACCESS_TOKEN =
//   "ya29.a0AeTM1iczJS-Vh_izDo0mc3XA5qw4kczYqX-TgM4xL34VZgD1uA-Ks5kiTseKdvI-YBp9TZsNQxX6hvkLro2-QX_BLpIgty7JGgqigcJ7kS6e4UkYwH_HcB7O1J1vNUYoDzw7uV9lKRsHAmsp9O-zrtqPWsPT4waCgYKAYESARISFQHWtWOmxgXcqcmG4db2olAFFBrS6A0165";

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.SECRET,
//   "http://localhost:3000/view-files"
// );

// oauth2Client.setCredentials({
//   access_token: ACCESS_TOKEN,
//   scope: [
//     "https://www.googleapis.com/auth/drive",
//     "https://www.googleapis.com/auth/drive.appdata",
//     "https://www.googleapis.com/auth/drive.file",
//     "https://www.googleapis.com/auth/drive.metadata",
//     "https://www.googleapis.com/auth/drive.metadata.readonly",
//     "https://www.googleapis.com/auth/drive.photos.readonly",
//     "https://www.googleapis.com/auth/drive.readonly",
//     "https://www.googleapis.com/auth/drive.scripts",
//   ],
// });

// const drive = google.drive({
//   version: "v3",
//   auth: oauth2Client,
// });

// const filePath = path.join(
//   __dirname,
//   "../../../public/imgs/Chicken N Corn Delight.jpeg"
// );

// async function uploadFile() {
//   try {
//     const response = await drive.files.create({
//       requestBody: {
//         name: "404",
//         mimeType: mime.lookup(filePath),
//       },
//       media: {
//         mimeType: mime.lookup(filePath),
//         body: fs.createReadStream(filePath),
//       },
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// uploadFile();

// ==============================================================

const stream = require("stream");
const express = require("express");
const multer = require("multer");
const { google } = require("googleapis");

const uploadRouter = express.Router();
const upload = multer();

function get_oauth2Client(ACCESS_TOKEN) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.SECRET,
    "http://localhost:3000/view-files"
  );

  oauth2Client.setCredentials({
    access_token: ACCESS_TOKEN,
    scope: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.appdata",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.metadata",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
      "https://www.googleapis.com/auth/drive.photos.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/drive.scripts",
    ],
  });
  return oauth2Client;
}

const uploadFile = async (fileObject, ACCESS_TOKEN) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google
    .drive({ version: "v3", auth: get_oauth2Client(ACCESS_TOKEN) })
    .files.create({
      media: {
        mimeType: fileObject.mimetype,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        mimeType: fileObject.mimetype,
      },
    });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

uploadRouter.post("/upload", upload.any(), async (req, res, next) => {
  try {
    const { files } = req;
    for (let f = 0; f < files.length; f += 1) {
      await uploadFile(files[f], req.session.passport.user.accessToken);
    }

    res.status(200).send("Form Submitted");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = uploadRouter;
