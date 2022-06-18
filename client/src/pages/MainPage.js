import '../style/MainPage.css';
import BackstagePage from '../Backstage'
import ControlsPage from '../Controls'
import PreviewPage from '../Preview'
import VideoPage from '../Video'
import React from "react";


const MainPage = () =>{
    return(
      <div className="MainPage"> 
        <div className="Column1">
          <VideoPage />
          <BackstagePage />
        </div>

        <div className = "Column2">
          <ControlsPage />
          <PreviewPage /> 
        </div>
      </div>
    );
};
export default MainPage;