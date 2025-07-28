import { useAuth0 } from "@auth0/auth0-react";
import { Logout } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

/**
 * Kullanıcının kimlik doğrulama durumuna göre giriş veya çıkış butonlarını gösteren bileşen.
 */
function AuthButtons() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {!isAuthenticated ? (
        // Kullanıcı oturum açmamışsa "Giriş Yap" butonunu göster
        <Button
          color="inherit"
          onClick={() => loginWithRedirect()}
          sx={{
            backgroundColor: (theme) => theme.palette.warning.main,
            fontWeight: "600",
            textTransform: "none",
            display: "block",
            borderRadius: 0,
            width: "100%",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.warning.dark, // Hover durumunda daha koyu warning rengi
            },
          }}
        >
          Log In
        </Button>
      ) : (
        // Kullanıcı oturum açmışsa "Çıkış Yap" butonunu göster
        <Button
          color="inherit"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          sx={{
            display: "flex",
            gap: 7,
            backgroundColor: (theme) => theme.palette.error.main,
            fontWeight: "600",
            textTransform: "none",
            borderRadius: 0,
            width: "100%",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.error.dark, // Hover durumunda daha koyu error rengi
            },
          }}
        >
          <Typography
            textAlign="center"
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            Log Out
          </Typography>

          <Logout />

        </Button>
      )}
    </>
  );
}

export default AuthButtons;
