import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Material UI bileşenlerini içe aktar
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'; // Yükleme göstergesi için

// Layout component'lerini içe aktar
import DashboardLayout from '../Components/Layout/DashboardLayout';

// Sayfa component'lerini içe aktar
import DashboardPage from '../Pages/DashboardPage';
import UserProfilePage from '../Pages/User/UserProfile'; 

// API hook'unu içe aktar
import useApi from '../Hooks/UseApi';
import AuthButton from '../Components/AuthButton';

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
  // hasSynced useRef'i, senkronizasyonun mevcut oturumda bir kez yapılıp yapılmadığını takip eder.
  // Component yeniden render olsa bile değerini korur ve useEffect'in çift tetiklenmesini engeller.
  const hasSynced = useRef(false); 

  // Component her render edildiğinde logla
  console.log('AppRoutes Rendered. isAuthenticated:', isAuthenticated, 'hasSynced.current:', hasSynced.current);

  // Kullanıcı giriş yaptığında Auth0 kullanıcısını veritabanı ile senkronize et
  useEffect(() => {
    console.log('AppRoutes useEffect Triggered. isAuthenticated:', isAuthenticated, 'hasSynced.current (inside useEffect):', hasSynced.current);

    const syncUserWithBackend = async () => {
      console.log('syncUserWithBackend called. isAuthenticated:', isAuthenticated, 'hasSynced.current:', hasSynced.current);
      // Sadece kimlik doğrulandıysa VE daha önce mevcut oturumda senkronize edilmediyse çalıştır
      if (isAuthenticated && !hasSynced.current) {
        console.log('Condition met: Authenticated and NOT synced. Proceeding with sync...');
        setIsSyncingUser(true);
        try {
          // API'deki /api/users/sync endpoint'ini çağır
          // Boş bir istek gövdesi göndermek yerine 'undefined' gönderiyoruz.
          // Axios, undefined bir gövde gönderildiğinde Content-Type başlığını göndermez,
          // bu da .NET tarafındaki JSON ayrıştırma hatasını engeller.
          const response = await api.post('/users/sync', undefined); 
          console.log('Kullanıcı başarıyla senkronize edildi veya zaten mevcut:', response.data);
          hasSynced.current = true; // Senkronizasyon yapıldı olarak işaretle
          console.log('hasSynced.current set to TRUE.');
        } catch (error) {
          console.error('Kullanıcı senkronizasyonunda hata:', error);
          // Hata durumunda kullanıcıya bilgi verebilirsiniz
        } finally {
          setIsSyncingUser(false);
          console.log('syncUserWithBackend finished.');
        }
      } else if (!isAuthenticated) {
        console.log('User is NOT authenticated. Resetting hasSynced.current.');
        hasSynced.current = false; // Kullanıcı oturumu kapanırsa senkronizasyon durumunu sıfırla
        setIsSyncingUser(false);
      } else {
        console.log('User is authenticated but already synced or condition not met. Skipping sync.');
        setIsSyncingUser(false); 
      }
    };

    syncUserWithBackend();

    // Cleanup fonksiyonu (component unmount edildiğinde veya bağımlılıklar değiştiğinde çalışır)
    return () => {
      console.log('AppRoutes useEffect Cleanup. isAuthenticated:', isAuthenticated, 'hasSynced.current:', hasSynced.current);
      // Eğer component unmount oluyorsa ve StrictMode nedeniyle tekrar mount ediliyorsa,
      // hasSynced.current'ı burada sıfırlamak istemeyiz, çünkü bu StrictMode'un doğasıdır.
      // Sadece !isAuthenticated durumunda sıfırlama yapıyoruz.
    };
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

              <AuthButton/>

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
