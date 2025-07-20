import { Typography, Box } from '@mui/material';
import UserProfile from '../Components/UserProfile'; // UserProfile component'ini içe aktar
import UserList from '../Components/UserList';     // UserList component'ini içe aktar

/**
 * Dashboard ana sayfasının içeriğini gösteren bileşen.
 * Kullanıcı profili ve API'den çekilen kullanıcı listesini içerir.
 */
function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Ana Dashboard
      </Typography>
      <UserProfile /> {/* Kullanıcı profilini göster */}
      <UserList />    {/* API'den çekilen kullanıcı listesini göster */}
    </Box>
  );
}

export default DashboardPage;
