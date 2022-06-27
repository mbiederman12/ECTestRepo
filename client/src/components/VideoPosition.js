import React from 'react'
import { OTSession, OTStreams } from 'opentok-react';
import '../style/Video.css';
import {position} from "./PositionButton"

function VideoPosition(){
    alert('test');
    alert(position.position1);

    return(
        <div className="Video">
           <h2>TEST</h2>
        </div>
        
    );
}

export default VideoPosition