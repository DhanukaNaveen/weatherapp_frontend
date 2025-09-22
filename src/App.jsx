import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';  // Import necessary Auth0 components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WeatherDetails from './components/WeatherDetails';

// Access environment variables from Vite
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

function App() {
  const redirectUri = window.location.origin;

  return (
    <Auth0Provider
      domain={domain} // The Auth0 domain from .env
      clientId={clientId} // The Auth0 client ID from .env
      authorizationParams={{ redirect_uri: redirectUri }} // Use redirectUri properly
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:cityCode" element={<WeatherDetails />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
