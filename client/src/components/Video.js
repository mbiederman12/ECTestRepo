import React from 'react'
import '../style/Video.css';
import Stream from './Stream';

export default class VideoPage extends React.Component {
    alert
    render(){
        return(
            <div className="Video">
                <h3> VIDEO </h3>
                <Stream />
               
            </div>
        );
    };
};
