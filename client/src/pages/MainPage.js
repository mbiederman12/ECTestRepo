import '../style/MainPage.css';
import ControlsPage from '../Controls'
import VideoPage from '../Video'
import React from "react";


export default class MainPage extends React.Component {
    
    render(){
    return(
      <div className="MainPage"> 
        <div className="Column1">
          <VideoPage />
        </div>
        <div className = "Column2">
          <ControlsPage />
        </div>
      </div>
    );
    }
};
