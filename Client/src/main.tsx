  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { Auth0Provider } from '@auth0/auth0-react';
  import { BrowserRouter } from 'react-router-dom';
  import App from './App.tsx';
  import './index.css';

  const auth0Domain: string = "dev-3t1zzqahtz1cizss.us.auth0.com";
  const auth0ClientId: string = "VtwBcw8LhCYu8rR6qVxTkDon4wgMhoXV";
  // Buradaki audience değeri, Auth0 API'nizin Identifier'ı ile aynı olmalı!
  const auth0Audience: string = "https://dev-3t1zzqahtz1cizss.us.auth0.com/api/v2/"; // <-- Bu değeri kontrol edin!

  const redirectUri: string = window.location.origin;

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          authorizationParams={{
            redirect_uri: redirectUri,
            audience: auth0Audience, // <-- Buranın doğru olduğundan emin olun!
            scope: "openid profile email"
          }}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
