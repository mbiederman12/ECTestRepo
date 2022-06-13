import React,{ useEffect, useState} from "react";
import './App.css';
import BackstagePage from './components/Backstage'
import ControlsPage from './components/Controls'
import PreviewPage from './components/Preview'
import VideoPage from './components/Video'

var apiKey;
var sessionId;
var token;
 /* 
function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);
    
  // Subscribe to a newly created stream
  
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
    }, handleError);
  });
         

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
  }, handleError);
  
  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });

  
}

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
      
  }
}*/

function App() {
  const [backendData, setBackendData] = useState([{}])
  useEffect(()=>{
    fetch("/").then(
      response => response.json()
    ).then(
      data=>{
        setBackendData(data)
      }
    )
  },[])
  
  return <div className="App"> 
    
    <div className="Column1">
      <VideoPage />
      
      {(typeof backendData.variables === 'undefined') ?(
        console.log('loading ... ')
      ): (
        apiKey = backendData.variables.apiKey,
        sessionId = backendData.variables.sessionId,
        token = backendData.variables.token,
        console.log(apiKey),
        console.log(sessionId),
        console.log(token)
      )
    }
      <BackstagePage />
    </div>

    <div className = "Column2">
      <ControlsPage />
      <PreviewPage /> 
    </div>
  </div>;
}

export default App;
