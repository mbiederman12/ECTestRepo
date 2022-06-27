import React from 'react';
import '../style/Backstage.css'
import { OTSubscriber } from 'opentok-react';


export default class Subscriber extends React.Component {
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
      
      <div>
        {apiKey !== "" && sessionId !== "" && token !== "" && 

        <div className='OT_publisher'>
        <OTSubscriber
                properties={{ width: 150, height: 120 }}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
    

        </div>
        }
      </div>
        

    )
  }
}
