const express = require('express')
const app = express()
const res = require('express/lib/response');
const OpenTok = require('opentok');
const https = require('https');
const { projectToken } = require('opentok-jwt');


// My Project API info
const apiKey = "47525941";
const apiSecret = "09af2fe51e43af6d2a88cec485dcd01c40039991";

const projectJWT = projectToken(apiKey, apiSecret);
//const accountJWT = accountToken(apiKey, apiSecret);

// Create new instance 
var opentok = new OpenTok(apiKey, apiSecret);

//app.use(express.json());
// Create Session + Store in Express App
opentok.createSession({mediaMode:"routed"},function (err, session) {
    if (err) return console.log(err);
    app.set('sessionId', session.sessionId);
    
    app.listen(3001, function () {
      console.log('Server listening on PORT 3001');
    });
});

app.get('/',(req,res) =>{
  opentok.createSession;
  res.redirect('http://localhost:3000/');
});


app.get('/api', (req, res) => {
    var sessionId = app.get('sessionId');

    var option ={
      expireTime: new Date().getTime() / 1000 + 7 *24*60*60,
    };

    // Generate a Token from the sessionId
    var token = opentok.generateToken(sessionId, option);
    app.set('token', token);

    // Renders Views (Sends HTML to client) + pass in variables: apiKey, sessionId, token
    res.json({apiKey:apiKey, sessionId:sessionId, token:token});
  });


  // ARCHIVE SERVER CONTROLS
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
    res.redirect('http://localhost:3000/')
  })
  
  app.post('/stop', function(req, res){

    opentok.stopArchive(app.get('archiveId'), function (err, archive) {
      if (err) return console.log(err);
      console.log("Stopped archive:" + archive.id);
    });

    res.redirect('http://localhost:3000/')
  })
  
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
app.get('/startEC', (req, res)=>{
  var ECID = '';
  console.log(app.get('sessionId'));

  const data = JSON.stringify({
      "sessionId": (app.get('sessionId')),
      "token": (app.get('token')),
      "url": "https://www.youtube.com/watch?v=yjki-9Pthh0",
      "maxDuration": 1800,
      "resolution": "1280x720",
      "properties": {
        "name": "Composed stream for Live event #1"
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
      // at this point, `body` has the entire request body stored in it as a string
      var InfoObj = JSON.parse(body);
      ECID = InfoObj.id;
      console.log(ECID);
      app.set('experienceComposerId', ECID);
    });
  });

  request.on('error', error => {
    console.error(error);
  });
  
  request.write(data);
  request.end();
  
  res.redirect('http://localhost:3000/');
  
  
  
});

app.get('/stopEC', (req, res)=>{
  var experienceComposerId = '';
  experienceComposerId = app.get('experienceComposerId')
  console.log('ECID:    ');
  console.log(experienceComposerId);

  const data = JSON.stringify({
    "sessionId": (app.get('sessionId')),
    "token": (app.get('token')),
    "url": "https://www.youtube.com/watch?v=yjki-9Pthh0",
    "maxDuration": 1800,
    "resolution": "1280x720",
    "properties": {
      "name": "Composed stream for Live event #1"
    }
});
  const options = {
    hostname: 'api.opentok.com',
    port: 443,
    path: `/v2/project/47525941/render/` + String(experienceComposerId),
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
  res.redirect('http://localhost:3000/');
});