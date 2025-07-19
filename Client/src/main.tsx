import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react'; // Auth0Provider'ı import et
import App from './App.tsx'; // App.tsx uzantısına dikkat
import './index.css';

// Auth0 ayarlarını buraya kendi değerlerinle ekle
const auth0Domain: string = "dev-3t1zzqahtz1cizss.us.auth0.com";     // Auth0 Dashboard'dan al
const auth0ClientId: string = "VtwBcw8LhCYu8rR6qVxTkDon4wgMhoXV"; // Auth0 Dashboard'dan al
const auth0Audience: string = "https://dev-3t1zzqahtz1cizss.us.auth0.com/api/v2/"; // Auth0 API Identifier'ın

// Auth0 Callback URL'i, Auth0 Dashboard'da "Allowed Callback URLs" olarak eklediğinle aynı olmalı
const redirectUri: string = window.location.origin;

ReactDOM.createRoot(document.getElementById('root')!).render( // ! ekledik, çünkü getElementById null dönebilir ama biz eminiz
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: auth0Audience,
        scope: "openid profile email" // İhtiyacın olan diğer scope'ları da buraya ekleyebilirsin.
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);