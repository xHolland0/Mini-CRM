import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from '../Hooks/UseApi'; // useApi hook'unu içe aktar
import { Typography, Box, CircularProgress, Paper, List, ListItem, ListItemText } from '@mui/material'; // Material UI bileşenleri

/**
 * API'den kullanıcı listesini çeken ve görüntüleyen bileşen.
 */
function UserList() {
  const { isAuthenticated } = useAuth0(); // Sadece isAuthenticated yeterli
  const api = useApi();
  const [users, setUsers] = useState<any[]>([]);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Kullanıcı kimliği doğrulandığında API'den kullanıcıları çek
  useEffect(() => {
    const fetchUsers = async () => {
      if (isAuthenticated) { //isAuthenticated kontrolü
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
        setUsers([]); // Oturum açmamışsa listeyi temizle
        setApiError(null);
      }
    };

    fetchUsers();
  }, [isAuthenticated, api]); // Bağımlılıklar: isAuthenticated ve api

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        API'den Çekilen Kullanıcılar:
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
        <Typography>Henüz kullanıcı bulunamadı veya yetkiniz yok.</Typography>
      )}
    </Box>
  );
}

export default UserList;
