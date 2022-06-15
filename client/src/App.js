import './style/App.css';
import BackstagePage from './Backstage'
import ControlsPage from './Controls'
import PreviewPage from './Preview'
import VideoPage from './Video'
import Stream from './Stream';

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
