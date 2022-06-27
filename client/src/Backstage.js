import React from "react";
import './style/Backstage.css'
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';
import Stream from './Stream';
import PositionButton from './components/PositionButton';

import { OTSession, OTStreams } from 'opentok-react';

export default class BackstagePage extends React.Component {

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

    this.componentDidMount();
  };

  onSessionError = error => {
    this.setState({ error });
  };

  render(){
    const { apiKey, sessionId, token } = this.state;
    return(
        <div className="Backstage">
            <h4>BACKSTAGE</h4>
           <Stream />
          <PositionButton />
        </div>
    );
  }
}
