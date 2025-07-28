import { Typography, Box } from '@mui/material';

/**
 * Dashboard ana sayfasının içeriğini gösteren bileşen.
 */
function DashboardPage() {
  return (
      <Box
        sx={{
          textAlign: 'center', // İçeriği yatayda ortalamak için
          color: (theme) => theme.palette.text.primary, // Temadan al
          padding: 4, // İçerik için boşluk
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Main Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Welcome The Main Dashboard! This Area Your's Control Panel
        </Typography>
      </Box>
  );
}

export default DashboardPage;
