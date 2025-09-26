import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
     <Router>
      <Routes>
      
        <Route path="/Login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
