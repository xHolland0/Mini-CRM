import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import './App.css';

// Material UI bileşenlerini içe aktar
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import useApi from './Hooks/UseAPi'; // API

/**
 * Ana uygulama bileşeni.
 * Kullanıcının kimlik doğrulama durumunu yönetir ve buna göre UI'ı gösterir.
 * Ayrıca giriş yapmış kullanıcının API'den veri çekmesini sağlar.
 */

function App() {
  const { 
    loginWithRedirect, 
    logout, 
    isAuthenticated, 
    user, 
    isLoading,
    error 
  } = useAuth0();

  const api = useApi();
  const [users, setUsers] = useState<any[]>([]);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Kullanıcı kimliği doğrulandığında veya component yüklendiğinde API'den kullanıcıları çek
  useEffect(() => {
    const fetchUsers = async () => {
      if (isAuthenticated && !isLoading) {
        setApiLoading(true);
        setApiError(null);
        try {
          const response = await api.get('/Users'); 
          setUsers(response.data);
        } catch (err: any) {
          setApiError(err.response?.data?.message || err.message || 'API Hatası');
        } finally {
          setApiLoading(false);
        }
      } else if (!isAuthenticated && !isLoading) {
        setUsers([]);
        setApiError(null);
      }
    };

    fetchUsers();
  }, [isAuthenticated, isLoading, api]);

  // Auth0 SDK'sı hala yükleniyorsa bir yükleme mesajı göster
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

  // Kimlik doğrulama sırasında bir hata oluştuysa hata mesajını göster
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
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar (Navigasyon Çubuğu) */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Çok Kiracılı CRM
          </Typography>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              Giriş Yap
            </Button>
          ) : (
            <Button color="inherit" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Çıkış Yap
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Ana içerik alanı */}
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        {isAuthenticated ? (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Hoş Geldiniz, {user?.name || user?.email}!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Oturum açtınız.
            </Typography>
            {user && (
              <Box sx={{ mt: 3, textAlign: 'left', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1, overflowX: 'auto' }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Kullanıcı Profil Bilgileri:
                </Typography>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.85rem' }}>
                  {JSON.stringify(user, null, 2)}
                </pre>
              </Box>
            )}

            {/* API'den çekilen kullanıcıları gösterme alanı */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                API'den Çekilen Kullanıcılar:
              </Typography>
              {apiLoading ? (
                <CircularProgress /> // API yüklenirken bir yükleme göstergesi
              ) : apiError ? (
                <Typography color="error">API Hatası: {apiError}</Typography>
              ) : users.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {users.map((userItem) => (
                    <li key={userItem.id} style={{ marginBottom: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                      {userItem.name} ({userItem.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>Henüz kullanıcı bulunamadı veya yetkiniz yok.</Typography>
              )}
            </Box>
          </Paper>
        ) : (
          <Typography variant="h5" component="h2" sx={{ color: 'text.secondary', mt: 4 }}>
            Devam etmek için lütfen giriş yapın.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default App;
