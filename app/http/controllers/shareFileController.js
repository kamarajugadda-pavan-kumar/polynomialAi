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

async function shareFile(auth, fileId, targetUserEmail, targetDomainName) {
  const service = google.drive({ version: "v3", auth });
  const permissionIds = [];

  const permissions = [
    {
      type: "user",
      role: "writer",
      emailAddress: targetUserEmail, // 'user@partner.com',
    },
    {
      type: "domain",
      role: "writer",
      domain: targetDomainName, // 'example.com',
    },
  ];

  for (const permission of permissions) {
    try {
      const result = await service.permissions.create({
        resource: permission,
        fileId: fileId,
        fields: "id",
      });
      permissionIds.push(result.data.id);
      console.log(`Inserted permission id: ${result.data.id}`);
    } catch (err) {
      // TODO(developer): Handle failed permissions
      console.error(err);
    }
  }
  return permissionIds;
}

module.exports = { get_oauth2Client, shareFile };
