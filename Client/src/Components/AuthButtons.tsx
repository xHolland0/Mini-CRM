import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

/**
 * Kullanıcının kimlik doğrulama durumuna göre giriş veya çıkış butonlarını gösteren bileşen.
 */
function AuthButtons() {
  const { 
    isAuthenticated, 
    loginWithRedirect, 
    logout 
  } = useAuth0();

  return (
    <>
      {!isAuthenticated ? (
        // Kullanıcı oturum açmamışsa "Giriş Yap" butonunu göster
        <Button 
          color="inherit" 
          onClick={() => loginWithRedirect()}
        >
          Giriş Yap
        </Button>
      ) : (
        // Kullanıcı oturum açmışsa "Çıkış Yap" butonunu göster
        <Button 
          color="inherit" 
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Çıkış Yap
        </Button>
      )}
    </>
  );
}

export default AuthButtons;
