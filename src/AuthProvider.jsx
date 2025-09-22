import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const AuthProvider = ({ children }) => {
  const domain = 'dev-ydfwgxx6p3n1djvt.us.auth0.com'; // Your Auth0 domain
  const clientId = 'iR2VKt4r4x567KbZ434B699xcExJ9H29'; // Your Auth0 client ID

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
