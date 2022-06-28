import '../style/MainPage.css';
import ControlsPage from '../components/Controls'
import VideoPage from '../components/Video'
import React from "react";


export default class MainPage extends React.Component {
    //Split Main Page into Video Column and Controls Column

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
