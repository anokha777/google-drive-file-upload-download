// https://www.youtube.com/watch?v=gGSJpp6_ax0

/***** import primaries materials in order to build the Api code *****/
// import Google api library
var { google } = require("googleapis");
// import the Google drive module in google library
var drive = google.drive("v3");
// import our private key
var key = require("./private_key.json");

// import path ° directories calls °
var path = require("path");
// import fs ° handle data in the file system °
var fs = require("fs");


/***** make the request to retrieve an authorization allowing to works
      with the Google drive web service *****/
// retrieve a JWT
var jwToken = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key, ["https://www.googleapis.com/auth/drive"],
  null
);

jwToken.authorize((authErr) => {
  if (authErr) {
    console.log("error : " + authErr);
    return;
  } else {
    console.log("Authorization accorded");
  }
});


// list file in speciifcs folder
// const parents = "1pGENEHR1sBptHo64Eh6KBHjzERcsevdo";
// drive.files.list({
//   auth: jwToken,
//   pageSize: 50,
//   q: "'" + parents + "' in parents and trashed=false",
//   fields: 'files(id, name)',
// }, (err, {data}) => {
//   if (err) return console.log('The API returned an error: ' + err);
//   var files = data.files;
//   if (files.length) {
//     console.log('Files:');
//     files.map((file) => {
//       console.log(`${file.name} (${file.id})`);
//     });
//   } else {
//     console.log('No files found.');
//   }
// });


// upload file in specific folder
// var folderId = "1pGENEHR1sBptHo64Eh6KBHjzERcsevdo";
// var fileMetadata = {
//   'name': 'abcd.txt',
//   parents: [folderId]
// };
// var media = {
//   mimeType: 'text/plain',
//   body: fs.createReadStream(path.join(__dirname, './abcd.txt'))
// };
// drive.files.create({
//   auth: jwToken,
//   resource: fileMetadata,
//   media: media,
//   fields: 'id'
// }, function(err, file) {
//   if (err) {
//     // Handle error
//     console.error(err);
//   } else {
//     console.log('File Id: ', file.data.id);
//   }
// });


// download files from google drive
var fileId = '1W7g-7_VShiVEwWvCt9MH9Hd8_X3oxXZn';
var dest = fs.createWriteStream('D:/Brajesh/text.txt');
drive.files.get({ auth: jwToken, fileId: fileId, alt: 'media' }, { responseType: 'stream' },
  function (err, res) {
  console.log('res= ', res)
    res.data
      .on('end', () => {
        console.log('Done');
      })
      .on('error', err => {
        console.log('Error', err);
      })
      .pipe(dest);
  }
);
