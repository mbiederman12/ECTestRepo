const https = require('https');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const OpenTok = require('opentok');
const { projectToken } = require('opentok-jwt');

// Create Express App
const app = express()

// Link to Client Side for EC, needs to be publicly accessible (Could deploy to Heroku)
var host_link = 'http://localhost:3000/';

// Project API INFO
const apiKey = '47525941';
const apiSecret = '09af2fe51e43af6d2a88cec485dcd01c40039991';


// Create JWT using opentok-jwt sdk to create a token for the header X-OPENTOK-AUTH in https request
const expires = Math.floor(new Date() / 1000) + (24 * 60 * 60); // Now + 1 day
const projectJWT = projectToken(apiKey, apiSecret, expires);

// Create new instance of OT
var opentok = new OpenTok(apiKey, apiSecret);

app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname+"/public")))

// Create Session & Store SessionID in Express App
opentok.createSession({mediaMode:"routed"},function (err, session) {
  if (err) return console.log(err);
  app.set('sessionId', session.sessionId);
});

// Server is running on http://localhost:3001/
app.listen(process.env.PORT || 3001, function () {
  console.log('Server listening on PORT 3001');
});

//Create Second OpenTok Session for EC Archiving
opentok.createSession({mediaMode:"routed"},function (err, sessionECArchive) {
  if (err) return console.log(err);
  app.set('sessionIdECArchive', sessionECArchive.sessionId);
  
});

// GET request made from client to server to retrieve apiKey, sessionId, and token data
app.get('/api', (req, res) => {
  var sessionId = app.get('sessionId');
  var sessionIdECArchive = app.get('sessionIdECArchive');
  var option ={
    expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // expires in a week from today
  };

  // Generate a Token from the sessionId (options expireTime allows the token to be accessable for a week)
  var token = opentok.generateToken(sessionId, option);
  app.set('token', token);

  // Generate token for Second Session for Archiving
  var tokenECArchive = opentok.generateToken(sessionIdECArchive, option);
  app.set('tokenECArchive', tokenECArchive);

  res.json({apiKey:apiKey, sessionId:sessionId, token:token});
});


// ARCHIVE SERVER CONTROLS - regular opentok archiving with designated layout
// Start Archiving current session
app.post('/start', function(req, res){
  opentok.startArchive(app.get('sessionId'), function (
    err,
    archive
  ) {
    if (err) {
      return console.log(err);
    } else {
      console.log("new archive:" + archive.id);
      app.set('archiveId', archive.id);
    }
  });
    res.redirect(host_link);
})

// Stop Archiving current session
app.post('/stop', function(req, res){
  opentok.stopArchive(app.get('archiveId'), function (err, archive) {
    if (err) return console.log(err);
    console.log("Stopped archive:" + archive.id);
  });
  res.redirect(host_link);
})

// Send list of archives with archive data to client
app.get('/listarchives', (req, res)=>{
  opentok.listArchives( function (
    error,
    archives,
    totalCount
  ) {
    res.json(archives);
  });
});


// EXPERIENCE COMPOSER SERVER CONTROLS
// Start an Experience Composer by sending an HTTP POST request
app.post('/store-data',(req, res) => {
  //retrieve URL from user input
  let URL= req.body.ecidURL;              
  var ECID = '';
  // HTTP body data
  const data = JSON.stringify({
      "sessionId": (app.get('sessionId')),
      "token": (app.get('token')),
      "url": (URL),
      "maxDuration": 1800,
      "resolution": "1280x720",
      "properties": {
        "name": "Live Stream"
      }
  });
  // HTTP request header parameter
  const options = {
    hostname: 'api.opentok.com',
    port: 443,
    path: '/v2/project/47525941/render',
    method: 'POST',
    headers: {
      'X-OPENTOK-AUTH':(projectJWT),
      'Content-Type': 'application/json'
    },
  };

  var body =[];
  const request = https.request(options, response => {
    response.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log(body);
      var InfoObj = JSON.parse(body);
      ECID = InfoObj.id;
      console.log(ECID);
      app.set('ECID', ECID);
    });
  });

  request.on('error', error => {
    console.error(error);
  });
  
  request.write(data);
  request.end();
  
  res.redirect(host_link);
});

// Stop an Experience Composer by sending an HTTP DELETE request
app.get('/stopEC', (req, res)=>{
  
  var ECID = '';
  ECID = app.get('ECID')
  console.log('ECID:    ');
  console.log(ECID);

  const data = JSON.stringify({
    "sessionId": (app.get('sessionId')),
    "token": (app.get('token')),
});
  const options = {
    hostname: 'api.opentok.com',
    port: 443,
    path: `/v2/project/47525941/render/` + String(ECID),
    method: 'DELETE',
    headers: {
      'X-OPENTOK-AUTH':(projectJWT),
      'Content-Type': 'application/json'
    },
  };
  const request = https.request(options, response => {
    console.log(`statusCode: ${response.statusCode}`);

    response.on('data', d => {
      process.stdout.write(d);
    });
  });
  request.write(data);
  request.end();
  res.redirect(host_link);
});

// HTTP POST request with new session and token to create a new Experience Composer to archive the Entire Website's layout
app.post('/startArchivingEC', function(req, res){
  var ECIDArchive = '';

  const data = JSON.stringify({
      "sessionId": (app.get('sessionIdECArchive')),
      "token": (app.get('tokenECArchive')),
      "url": (host_link),
      "maxDuration": 1800,
      "resolution": "1280x720",
      "properties": {
        "name": "Live Stream"
      }
  });

  const options = {
    hostname: 'api.opentok.com',
    port: 443,
    path: '/v2/project/47525941/render',
    method: 'POST',
    headers: {
      'X-OPENTOK-AUTH':(projectJWT),
      'Content-Type': 'application/json'
    },
  };

  var body =[];
  const request = https.request(options, response => {
    response.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log(body);
      var InfoObj = JSON.parse(body);
      ECID = InfoObj.id;
      console.log(ECIDArchive);
      app.set('ECIDArchive', ECIDArchive);
    });
  });

  request.on('error', error => {
    console.error(error);
  });
  
  request.write(data);
  request.end();

  // Need to wait, because it takes time to create the Experience Composer and subcribe to the session.
  setTimeout(() => { 
    opentok.startArchive(app.get('sessionIdECArchive'), function (
      err,
      archive
    ) {
      if (err) {
        return console.log(err);
      } else {
        console.log("new archive:" + archive.id);
        app.set('archiveIdEC', archive.id);
      }
    }) }, 5000);
  res.redirect(host_link);
})

// Stop Archiving Experience Composer of entire layout of website, Send HTTP DELETE Request with new session and token info 
app.post('/stopArchivingEC', function(req, res){
  var ECIDArchive = '';
  ECIDArchive = app.get('ECIDArchive')
  console.log('ECID:    ');
  console.log(ECIDArchive);

  const data = JSON.stringify({
    "sessionId": (app.get('sessionIdECArchive')),
    "token": (app.get('tokenECArchive')),
});
  const options = {
    hostname: 'api.opentok.com',
    port: 443,
    path: `/v2/project/47525941/render/` + String(ECIDArchive),
    method: 'DELETE',
    headers: {
      'X-OPENTOK-AUTH':(projectJWT),
      'Content-Type': 'application/json'
    },
  };
  const request = https.request(options, response => {
    console.log(`statusCode: ${response.statusCode}`);

    response.on('data', d => {
      process.stdout.write(d);
    });
  });
  request.write(data);
  request.end();

  opentok.stopArchive(app.get('archiveIdEC'), function (err, archive) {
    if (err) return console.log(err);
    console.log("Stopped archive:" + archive.id);
  });
  res.redirect(host_link);
})