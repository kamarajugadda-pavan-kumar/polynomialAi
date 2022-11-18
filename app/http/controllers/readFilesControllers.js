const { google } = require("googleapis");

const get_oauth2Client = (ACCESS_TOKEN) => {
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
};

async function searchFile(auth) {
  const service = google.drive({ version: "v3", auth });
  const files = [];
  try {
    const res = await service.files.list({
      q: "",
      fields: "nextPageToken, files(id, name)",
      spaces: "drive",
    });
    Array.prototype.push.apply(files, res.files);
    res.data.files.forEach(function (file) {
      console.log("Found file:", file.name, file.id);
    });
    return res.data.files;
  } catch (err) {
    throw err;
  }
}

module.exports = { get_oauth2Client, searchFile };
