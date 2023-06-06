import React from "react";
import MainPage from "./pages/mainPage";
import ProjectPage from "./pages/projectPage";
import UploadPage from "./pages/uploadPage";
import LogHistoryPage from "./pages/logHistoryPage";
import LoginPage from "./pages/loginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/main" element={<MainPage/>} />
      <Route path="/project" element={<ProjectPage/>} />
      <Route path="/upload" element={<UploadPage/>} />
      <Route path="/loghistory" element={<LogHistoryPage/>} />
    </Routes> 
  </BrowserRouter>
  
  );
}

export default App;
