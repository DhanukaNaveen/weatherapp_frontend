import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="flex flex-col items-start space-y-2">
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      ) : (
        <>
          <p className="text-white">Welcome, {user.name}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;