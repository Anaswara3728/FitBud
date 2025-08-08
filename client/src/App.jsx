import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import SignUp from './SignUp';
import Overview from "./Overview.jsx";
import Trends from "./Trends.jsx"




function App() {
  return (
     <Router>
      <Routes>
         <Route path="/" element={<Navigate to="/overview" replace />} />
         
        <Route path="/overview" element={<Overview />} />
        <Route path="/trends" element={<Trends />} />
      </Routes>
    </Router>
  );
}

export default App;
