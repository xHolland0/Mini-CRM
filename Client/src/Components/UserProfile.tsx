import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Box, Paper } from '@mui/material'; // Material UI bileşenleri

/**
 * Oturum açmış kullanıcının profil bilgilerini gösteren bileşen.
 */
function UserProfile() {
  const { user } = useAuth0();

  // Kullanıcı objesi yoksa veya yükleniyorsa bir şey gösterme
  if (!user) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Hoş Geldiniz, {user.name || user.email}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Oturum açtınız.
      </Typography>

      {/* Kullanıcı profil resmi varsa göster */}
      
      {user.picture && (
        <Box sx={{ my: 2 }}>
          <img 
            src={user.picture} 
            alt="Profil Resmi" 
            style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }} 
          />
        </Box>
      )}
      {/* Kullanıcı bilgilerinin tamamını JSON formatında göster */}
      <Box sx={{ mt: 3, textAlign: 'left', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1, overflowX: 'auto' }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Kullanıcı Profil Bilgileri:
        </Typography>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.85rem' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </Box>
    </Paper>
  );
}

export default UserProfile;
