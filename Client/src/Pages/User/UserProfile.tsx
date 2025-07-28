import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from '../../Hooks/UseApi';
import { Typography, Box, CircularProgress, Paper, Avatar } from '@mui/material';

/**
 * Kullanıcının profil bilgilerini gösteren sayfa bileşeni.
 * Bilgiler Auth0'dan ve kendi API'mizden çekilir.
 */
function UserProfilePage() {
  const { 
    user: auth0User, 
    isAuthenticated, 
    isLoading: auth0Loading 
  } = useAuth0();
  const api = useApi();
  const [backendUser, setBackendUser] = useState<any>(null); // Kendi API'mizden gelen kullanıcı verisi
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackendUser = async () => {
      if (isAuthenticated && auth0User?.sub) {
        setApiLoading(true);
        setApiError(null);
        try {
          const response = await api.post('/users/sync');
          setBackendUser(response.data);
        } catch (err: any) {
          console.error('Backend kullanıcı bilgileri çekilirken hata oluştu:', err);
          setApiError(err.response?.data?.message || err.message || 'API Hatası');
        } finally {
          setApiLoading(false);
        }
      } else {
        setBackendUser(null);
        setApiError(null);
      }
    };

    fetchBackendUser();
  }, [isAuthenticated, auth0User, api]);

  if (auth0Loading || apiLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Profil bilgileri için giriş yapmalısınız.
        </Typography>
      </Box>
    );
  }

  const displayName = auth0User?.name || auth0User?.email || 'Bilinmeyen Kullanıcı';
  const displayEmail = auth0User?.email || 'bilinmeyen@example.com';
  const displayPicture = auth0User?.picture || 'https://placehold.co/100x100/aabbcc/ffffff?text=AV';

  const displayRole = backendUser?.role ? `Rol: ${backendUser.role}` : 'Rol Bilgisi Yok';
  const displayPhone = backendUser?.phone ? `Telefon: ${backendUser.phone}` : 'Telefon Bilgisi Yok';
  const displayPosition = backendUser?.position?.name ? `Pozisyon: ${backendUser.position.name}` : 'Pozisyon Bilgisi Yok';
  const displayTenant = backendUser?.tenant?.name ? `Kiracı: ${backendUser.tenant.name}` : 'Kiracı Bilgisi Yok';

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: (theme) => theme.palette.text.primary, // Temadan al
        backgroundColor: (theme) => theme.palette.background.default, // Temadan al

        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Kullanıcı Profilim
      </Typography>
      {apiError && (
        <Typography color="error" sx={{ mb: 2 }}>
          API Hatası: {apiError}
        </Typography>
      )}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.background.paper, // Temadan al
          color: (theme) => theme.palette.text.primary, // Temadan al
        }}
      >
        <Avatar
          alt={displayName}
          src={displayPicture}
          sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}
        />
        <Typography variant="h5" gutterBottom>{displayName}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{displayEmail}</Typography>
        <Typography variant="body1" sx={{ mb: 0.5 }}>{displayRole}</Typography>
        <Typography variant="body1" sx={{ mb: 0.5 }}>{displayPosition}</Typography>
        <Typography variant="body1" sx={{ mb: 0.5 }}>{displayPhone}</Typography>
        <Typography variant="body1" sx={{ mb: 0.5 }}>{displayTenant}</Typography>
      </Paper>
    </Box>
  );
}

export default UserProfilePage;
