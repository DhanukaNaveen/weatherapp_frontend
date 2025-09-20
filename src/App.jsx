import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Home page (shows weather cards for cities) */}
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
