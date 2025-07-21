import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from '../../Hooks/UseApi'; // useApi hook'unun yolu güncellendi
import { Typography, Box, CircularProgress, Paper, List, ListItem, ListItemText } from '@mui/material';

/**
 * API'den kullanıcı listesini çeken ve görüntüleyen sayfa bileşeni.
 */
function UserListPage() { // Component adını güncelledik
  const { isAuthenticated } = useAuth0();
  const api = useApi();
  const [users, setUsers] = useState<any[]>([]);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isAuthenticated) {
        setApiLoading(true);
        setApiError(null);
        try {
          const response = await api.get('/users');
          setUsers(response.data);
        } catch (err: any) {
          console.error('Kullanıcılar çekilirken hata oluştu:', err);
          setApiError(err.response?.data?.message || err.message || 'API Hatası');
        } finally {
          setApiLoading(false);
        }
      } else {
        setUsers([]);
        setApiError(null);
      }
    };

    fetchUsers();
  }, [isAuthenticated, api]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom> {/* h4 olarak güncelledik */}
        Kullanıcı Listesi
      </Typography>
      {apiLoading ? (
        <CircularProgress />
      ) : apiError ? (
        <Typography color="error">API Hatası: {apiError}</Typography>
      ) : users.length > 0 ? (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <List>
            {users.map((userItem) => (
              <ListItem key={userItem.id} divider>
                <ListItemText primary={userItem.name} secondary={userItem.email} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography>Henüz kullanıcı bulunamadı.</Typography>
      )}
    </Box>
  );
}

export default UserListPage; // Export adını güncelledik
