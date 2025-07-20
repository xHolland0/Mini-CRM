import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import './App.css'; 

// Material UI bileşenleri
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

// Layout component'leri
import DashboardLayout from './Components/Layout/DashboardLayout';

// Sayfa component'leri
import DashboardPage from './Pages/DashboardPage';
import UserList from './Components/UserList';

/**
 * Ana uygulama bileşeni.
 * Auth0 kimlik doğrulama durumunu yönetir ve ana layout'u sağlar.
 * Sayfalar arası navigasyonu yönetir.
 */
function App() {
  const { 
    isAuthenticated, 
    isLoading,
    error,
    loginWithRedirect 
  } = useAuth0();

  const [currentPage, setCurrentPage] = useState<string>('dashboard'); 

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users': 
        return <UserList />; 
      default:
        return <DashboardPage />;
    }
  };

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

      {isAuthenticated ? (
        // Kullanıcı oturum açmışsa DashboardLayout'u ve aktif sayfayı göster
        <DashboardLayout onNavigate={handleNavigation}>
          {renderPage()} 
        </DashboardLayout>
      ) : (
        // Kullanıcı oturum açmamışsa giriş yapma ekranını göster
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', // Dikeyde ortala
          alignItems: 'center',     // Yatayda ortala
          flexGrow: 1,              // Kalan dikey alanı kapla
        }}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 2, textAlign: 'center', maxWidth: 400 }}>
            <Typography variant="h5" component="h2" sx={{ color: 'text.primary', mb: 3 }}>
              Devam etmek için lütfen giriş yapın.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => loginWithRedirect()}
              sx={{ px: 5, py: 1.5 }} // Butonun boyutu
            >
              Giriş Yap
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default App;
