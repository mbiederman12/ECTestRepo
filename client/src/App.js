import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// PAGES: 
import MainPage from "./pages/MainPage";
import ArchivePage from './pages/ArchivePage';
import NewSessionPage from './pages/NewSessionPage';

// Application will start in the Main page, when View Past Archives button is pressed, this will route to the /listarchives page
function App(){
    return (
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/listarchives/" element={<ArchivePage/>} />
        <Route path="/newsessionpage/" element={<NewSessionPage/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
