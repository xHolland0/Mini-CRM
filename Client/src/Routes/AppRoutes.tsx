import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Material UI bileşenlerini içe aktar
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Layout component'lerini içe aktar
import DashboardLayout from '../Components/Layout/DashboardLayout';

// Sayfa component'lerini içe aktar
import DashboardPage from '../Pages/DashboardPage';
import UserProfilePage from '../Pages/User/UserProfile'; 

/**
 * Uygulamanın tüm rotalarını ve kimlik doğrulama yönlendirme mantığını içeren bileşen.
 */
function AppRoutes() {
  const { 
    isAuthenticated, 
    loginWithRedirect 
  } = useAuth0();

  return (
    <Routes>
      {/* Giriş yapmamış kullanıcılar için ana rota */}
      <Route path="/" element={
        isAuthenticated ? (
          <Navigate to="/dashboard" /> 
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',     
            flexGrow: 1,              
            p: 3,
            // mt: '64px' // <-- Buradaki margin-top kaldırıldı
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
                sx={{ px: 5, py: 1.5 }} 
              >
                Giriş Yap
              </Button>
            </Paper>
          </Box>
        )
      } />

      {/* Giriş yapmış kullanıcılar için korumalı rotalar */}
      <Route path="/dashboard/*" element={ 
        isAuthenticated ? (
          <DashboardLayout>
            <Routes> 
              <Route path="/" element={<DashboardPage />} />
              <Route path="profile" element={<UserProfilePage />} /> 
              {/* İleride eklenecek diğer sayfalar */}
              <Route path="*" element={<Navigate to="/" />} /> 
            </Routes>
          </DashboardLayout>
        ) : (
          <Navigate to="/" /> 
        )
      } />

      {/* Tanımsız rotalar için 404 veya ana sayfaya yönlendirme */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
