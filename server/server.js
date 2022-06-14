const express = require('express')
const app = express()
const res = require('express/lib/response');
const OpenTok = require('opentok');

// My Project API info
const apiKey = "47512731";
const apiSecret = "8f9b78016ed88cf975be776f89e280a89dd8eccd";
const sessionId = "2_MX40NzUxMjczMX5-MTY1NTIyNTgzNjIwNn5jZEIzeTNocC9MMS82dmxMNFBITWR3dUh-fg";

// Create new instance 
var opentok = new OpenTok(apiKey, apiSecret);


/*app.use(express.static(__dirname + '/public')); 

app.use(express.urlencoded({
  extended: true
}))*/

// Create Session + Store in Express App
opentok.createSession({mediaMode:"routed"},function (err, session) {
    if (err) return console.log(err);
    app.set('sessionId', session.sessionId);
    
    app.listen(3001, function () {
      console.log('Server listening on PORT 3001');
    });
});

app.get('/', (req, res) => {
    var sessionId = app.get('sessionId');
  
    // Generate a Token from the sessionId
    var token = opentok.generateToken(sessionId);
  
    // Renders Views (Sends HTML to client) + pass in variables: apiKey, sessionId, token
    var data = [
    {
        id:"1",
        apiKey: apiKey,
        sessionId: sessionId,
        token: token
    }
]
    res.json({"variables": ["userOne","userTwo", "userThree"]})
  });


