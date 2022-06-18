import React from 'react';
import './style/Backstage.css'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';


export default class Stream extends React.Component {
  componentDidMount(){
    fetch("/api")
      .then((res) => res.json())
      .then((data) => this.setState({apiKey:data.apiKey, sessionId:data.sessionId, token:data.token}))
      .catch((err) => {
        console.error('Failed to get session creddentials', err);
        alert('Failed to get opentok sessionId and token');
      });
      
  }
  
  constructor(props) {
    super(props);
    
    
    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
      apiKey:"",
      sessionId:"",
      token:"",
    };
    

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: 'Connected' });
      },
      sessionDisconnected: () => {
        this.setState({ connection: 'Disconnected' });
      },
      sessionReconnected: () => {
        this.setState({ connection: 'Reconnected' });
      },
      sessionReconnecting: () => {
        this.setState({ connection: 'Reconnecting' });
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source');
      },
      streamCreated: () => {
        console.log('Publisher stream created');
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
    };

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled');
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled');
      },
    };
    this.componentDidMount();
  }

  



  onSessionError = error => {
    this.setState({ error });
  };

  onPublish = () => {
    console.log('Publish Success');
  };

  onPublishError = error => {
    this.setState({ error });
  };

  onSubscribe = () => {
    console.log('Subscribe Success');
  };

  onSubscribeError = error => {
    this.setState({ error });
  };

  toggleVideo = () => {
    this.setState(state => ({
      publishVideo: !state.publishVideo,
    }));
  };



  render(){
    
    const { apiKey, sessionId, token, publishVideo } = this.state;
    //alert(apiKey);
    return(
      <div>
        {apiKey !== "" && sessionId !== "" && token !== "" && 

          <OTSession
            apiKey={apiKey}
            sessionId={sessionId}
            token={token}
            onError={this.onSessionError}
            eventHandlers={this.sessionEventHandlers}
          >
            <div className='OT_publisher'>
              <OTPublisher
                properties={{ publishVideo, width:150,height:120 }}
                onPublish={this.onPublish}
                onError={this.onPublishError}
                eventHandlers={this.publisherEventHandlers}
              />
              <button id="videoButton" onClick={this.toggleVideo}>
                  {publishVideo ? 'Disable' : 'Enable'} Video
              </button>
              
            </div>
            
            <OTStreams>
              
              <OTSubscriber
                properties={{ width: 150, height: 120 }}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
              
            </OTStreams>

          </OTSession>
        }
        </div>
    );
  }
}