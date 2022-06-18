import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//Pages
import MainPage from "./pages/MainPage";
import ArchivePage from './pages/ArchivePage';

function App(){
    return (
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/listarchives/" element={<ArchivePage/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
