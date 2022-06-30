const https = require('https');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const OpenTok = require('opentok');
const { projectToken } = require('opentok-jwt');

// Create Express App
const app = express()

var host_link = "https://a31c-69-181-213-108.ngrok.io/";
// Project API INFO
const apiKey = "47525941";
const apiSecret = "09af2fe51e43af6d2a88cec485dcd01c40039991";


// create JWT using opentok-jwt sdk to create a token for the header X-OPENTOK-AUTH in https request
const expires = Math.floor(new Date() / 1000) + (24 * 60 * 60); // Now + 1 day
const projectJWT = projectToken(apiKey, apiSecret, expires);

// Create new instance of OT
var opentok = new OpenTok(apiKey, apiSecret);

app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname+"/public")))

// Create Session + Store SessionID in Express App
opentok.createSession({mediaMode:"routed"},function (err, session) {
  if (err) return console.log(err);
  app.set('sessionId', session.sessionId);
  
  app.listen(process.env.PORT || 3001, function () {
    console.log('Server listening on PORT 3001');
  });
});

opentok.createSession({mediaMode:"routed"},function (err, session2) {
  if (err) return console.log(err);
  app.set('sessionId2', session2.sessionId);
  
});


// GET request made from client to server to retrieve apiKey, sessionId, and token data
app.get('/api', (req, res) => {
  var sessionId = app.get('sessionId');
  var sessionId2 = app.get('sessionId2');
  var option ={
    expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // expires in a week from today
  };

  // Generate a Token from the sessionId (options expireTime allows the token to be accessable for a week)
  var token = opentok.generateToken(sessionId, option);
  app.set('token', token);

  var token2 = opentok.generateToken(sessionId2, option);
  app.set('token2', token2);

  res.json({apiKey:apiKey, sessionId:sessionId, token:token});
});


// ARCHIVE SERVER CONTROLS
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
// Retrieve EC ID URL from submission box in Controls Client side
app.post('/store-data',(req, res) => {
  let URL= req.body.ecidURL;
  var ECID = '';

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


app.post('/startArchivingEC', function(req, res){
  var ECID = '';

  const data = JSON.stringify({
      "sessionId": (app.get('sessionId2')),
      "token": (app.get('token2')),
      "url": "https://a31c-69-181-213-108.ngrok.io",
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
      console.log(ECID);
      app.set('ECID2', ECID);
    });
  });

  request.on('error', error => {
    console.error(error);
  });
  
  request.write(data);
  request.end();

  opentok.startArchive(app.get('sessionId2'), function (
    err,
    archive
  ) {
    if (err) {
      return console.log(err);
    } else {
      console.log("new archive:" + archive.id);
      app.set('archiveId2', archive.id);
    }
  });
  res.redirect(host_link);
})

// Stop Archiving current session
app.post('/stopArchivingEC', function(req, res){
  var ECID = '';
  ECID = app.get('ECID2')
  console.log('ECID:    ');
  console.log(ECID);

  const data = JSON.stringify({
    "sessionId": (app.get('sessionId2')),
    "token": (app.get('token2')),
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

  opentok.stopArchive(app.get('archiveId2'), function (err, archive) {
    if (err) return console.log(err);
    console.log("Stopped archive:" + archive.id);
  });
  res.redirect(host_link);
})