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
import useApi from '../Hooks/UseApi';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import UserListPage from '../Pages/User/UserList';

/**
 * Uygulamanın tüm rotalarını ve kimlik doğrulama yönlendirme mantığını içeren bileşen.
 */

function AppRoutes() {
  const { 
    isAuthenticated, 
    loginWithRedirect 
  } = useAuth0();

  const api = useApi();
  const [isSyncingUser, setIsSyncingUser] = useState(true); // Kullanıcı senkronizasyon durumunu takip et

  // Kullanıcı giriş yaptığında Auth0 kullanıcısını veritabanı ile senkronize et
  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated) {
        setIsSyncingUser(true);
        try {
          // API'deki /api/users/sync endpoint'ini çağır
          const response = await api.post('/users/sync');
          console.log('Kullanıcı başarıyla senkronize edildi veya zaten mevcut:', response.data);
        } catch (error) {
          console.error('Kullanıcı senkronizasyonunda hata:', error);
          // Hata durumunda kullanıcıya bilgi verebilirsiniz
        } finally {
          setIsSyncingUser(false);
        }
      } else {
        setIsSyncingUser(false); // Oturum açmamışsa senkronizasyon gerekmez
      }
    };

    syncUserWithBackend();
  }, [isAuthenticated, api]); // isAuthenticated veya api değiştiğinde çalıştır

  // Kullanıcı senkronize edilirken bir yükleme ekranı göster
  if (isAuthenticated && isSyncingUser) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',     
        minHeight: '100vh',              
        mt: '64px' // MainAppBar'ın yüksekliği kadar boşluk bırak
      }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6" component="div">
          Kullanıcı verileri senkronize ediliyor...
        </Typography>
      </Box>
    );
  }

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
              <Route path="users" element={<UserListPage />} /> 
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

