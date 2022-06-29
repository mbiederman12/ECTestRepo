import React from 'react';
import '../style/Video.css'
import { OTSubscriber, OTSession, OTStreams } from 'opentok-react';


export default class Subscriber extends React.Component {
  componentDidMount(){
    fetch("/createnewsession")
      .then((res) => res.json())
      .then((data) => this.setState({apiKey:data.apiKey, sessionId:data.sessionId, token:data.token}))
      .catch((err) => {
        console.error('Failed to get session creddentials', err);
      });
      
  }
  
  constructor(props) {
    super(props);
    
    
    this.state = {
      error: null,
      connection: 'Connecting',
      apiKey:"",
      sessionId:"",
      token:"",
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
  
render() {
    const { apiKey, sessionId, token } = this.state;

    return (
      
      <div className='Video'>
        {apiKey !== "" && sessionId !== "" && token !== "" && 
        <OTSession
            apiKey={apiKey}
            sessionId={sessionId}
            token={token}
            onError={this.onSessionError}
            eventHandlers={this.sessionEventHandlers}
          >
            <div className='OT_subscriber'>
            <OTStreams>
              
              <OTSubscriber
                properties={{ width: 700, height: 550 }}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
              
            </OTStreams>
            </div>

          </OTSession>
        }
      </div>
        

    )
  }
}
