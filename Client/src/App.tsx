import { useAuth0 } from '@auth0/auth0-react';
import './App.css'; 

// Material UI bileşenlerini içe aktar
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// import Toolbar from '@mui/material/Toolbar'; // Artık App.tsx'te Toolbar'a gerek yok

// Rota component'ini içe aktar
import AppRoutes from './Routes/AppRoutes'; 

/**
 * Ana uygulama bileşeni.
 * Auth0 kimlik doğrulama durumunu yönetir ve ana layout'u sağlar.
 * Rota yönetimini AppRoutes component'ine devreder.
 */
function App() {
  const { 
    isLoading,
    error,
    // loginWithRedirect // loginWithRedirect AppRoutes içinde kullanılacak
  } = useAuth0();

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6" component="div">
          Kimlik doğrulama durumu yükleniyor...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', color: 'error.main' }}>
        <Typography variant="h6" component="div">
          Kimlik Doğrulama Hatası: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* MainAppBar artık App.tsx'te doğrudan render edilmiyor.
          DashboardLayout içinde veya AppRoutes'taki giriş ekranında yer alacak. */}
      {/* AppRoutes içeriğinin en üstten başlamasını sağla */}
      {/* Toolbar boşluğuna da burada gerek kalmadı, AppRoutes içindeki layout yönetecek */}
      <AppRoutes />
    </Box>
  );
}

export default App;
