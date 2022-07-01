import React from 'react'
import '../style/Video.css';
import Stream from './Stream';

export default class VideoPage extends React.Component {

    render(){
        return(
            <div className="Video">
                <h2> VIDEO </h2>
                <Stream />
            </div>
        );
    };
};
