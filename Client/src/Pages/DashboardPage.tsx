import { Typography, Box } from '@mui/material';

/**
 * Dashboard ana sayfasının içeriğini gösteren bileşen.
 */
function DashboardPage() {
  return (
    <Box sx={{ textAlign: 'center' }}> {/* İçeriği yatayda ortalamak için eklendi */}
      <Typography variant="h4" component="h1" gutterBottom>
        Ana Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Uygulamanıza hoş geldiniz! Burası ana kontrol paneliniz.
      </Typography>
      
      {/* UserList artık ayrı bir sayfada olduğu için buradan kaldırıldı */}
    </Box>
  );
}

export default DashboardPage;
