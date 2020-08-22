const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Classroom API.
  authorize(JSON.parse(content), listCourses);
  //authorize(JSON.parse(content), getCourse);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  //const {client_secret, client_id, redirect_uris} = credentials.installed;
  const client_secret = '8fDSbuN9WoJzwrRwLteo7Lc8';
  const client_id = '739478567153-npus96af0fnrhrqtt4gj71ci3g4fboai.apps.googleusercontent.com';
  const redirect_uris = ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"];
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the first 10 courses the user has access to.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listCourses(auth) {
  const classroom = google.classroom({version: 'v1', auth});
  classroom.courses.list({
    pageSize: 10,
  }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    const courses = res.data.courses;
    if (courses && courses.length) {
      console.log('Courses:');
      courses.forEach((course) => {
        console.log(`${course.name} (${course.id})`);
      });
    } else {
      console.log('No courses found.');
    }
  });
}

function getCourse(auth) {
  const classroom = google.classroom({version: 'v1', auth});
  var courseId = '40961861149';
  classroom.courses.courseWork.list({
      pageSize: 10,
      courseId: courseId
  }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    console.log(res.data);
    const assignments = res.data.courseWork;
    if (assignments && assignments.length) {
        console.log('Assignments:');
        console.forEach((assignment) => {
            console.log(assignment);
        });
    } else {
        console.log('No assignments found.');
    }
  })
  // try {
  //   var course = classroom.courses.get(courseId);
  //   console.log('Course '+course.name+' found.');
  // } catch (err) {
  //   console.log("ERRROOOORRRRRRRRR ======>>>>>>>> "+err);
  //   console.log("Course with id "+courseId+" not found");
  // }
}