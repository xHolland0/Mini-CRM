import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'; 
import './index.css';

// Auth0 ayarları
const auth0Domain: string = "dev-3t1zzqahtz1cizss.us.auth0.com";
const auth0ClientId: string = "VtwBcw8LhCYu8rR6qVxTkDon4wgMhoXV";
const auth0Audience: string = "https://dev-3t1zzqahtz1cizss.us.auth0.com/api/v2/";

const redirectUri: string = window.location.origin;

ReactDOM.createRoot(document.getElementById('root')!).render( // ! ekledik, çünkü getElementById null dönebilir ama biz eminiz
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: auth0Audience,
        scope: "openid profile email"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);