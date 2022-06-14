import './style/App.css';
import BackstagePage from './components/Backstage'
import ControlsPage from './components/Controls'
import PreviewPage from './components/Preview'
import VideoPage from './components/Video'


function App() {

  return <div className="App"> 
    <div className="Column1">
    
      <VideoPage />
      <BackstagePage />
    </div>

    <div className = "Column2">
      <ControlsPage />
      <PreviewPage /> 
    </div>
  </div>;
}

export default App;
