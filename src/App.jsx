import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import WeatherDetails from './components/WeatherDetails';


function App() {
  const { isAuthenticated, loginWithRedirect, isLoading, error } = useAuth0();

  // Loading state
  if (isLoading) return <div>Loading...</div>;

  // Error handling
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/weather/:cityCode" element={<WeatherDetails />} />
        <Route path="/login" element={!isAuthenticated ? (
          <div>
            <h2>Login</h2>
            <button onClick={() => loginWithRedirect()}>Log in with Auth0</button>
          </div>
        ) : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
