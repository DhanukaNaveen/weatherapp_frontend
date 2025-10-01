import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';  // Import  Auth0 components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WeatherDetails from './components/WeatherDetails';
import Counter from './pages/Test';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

function App() {
  const redirectUri = window.location.origin;

  return (
    <Auth0Provider
      domain={domain} 
      clientId={clientId} 
      authorizationParams={{ redirect_uri: redirectUri }} 
      cacheLocation="localstorage"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:cityCode" element={<WeatherDetails />} />
          <Route path="/test" element={<Counter />} />
        </Routes>
      </Router>
    </Auth0Provider>  //makes authentication data and methods (like loginWithRedirect, logout, isAuthenticated, etc.) available to all components within the app.
  );
}

export default App;
