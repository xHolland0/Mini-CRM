import { Typography, Box, Breadcrumbs, Link as MuiLink } from '@mui/material'; // Material UI'ın Link'ini MuiLink olarak içe aktar
import { Link as RouterLink } from 'react-router-dom'; // React Router'ın Link'ini RouterLink olarak içe aktar
import RevenueExpenseOverview from '../Components/Dashboard/RevenueExpenseOverview'; // Yeni bileşeni içe aktar
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; // İkonu içe aktar

/**
 * Dashboard ana sayfasının içeriğini gösteren bileşen.
 * Genel gelir ve gider metriklerini içerir.
 */
function DashboardPage() {
  return (
    <Box sx={{ 
      padding: 3, // Genel sayfa boşluğu
      color: (theme) => theme.palette.text.primary,
    }}>
      {/* Breadcrumbs eklendi */}
      <Breadcrumbs 
        aria-label="breadcrumb" 
        separator={<NavigateNextIcon fontSize="small" />} // Ayırıcı ikon
        sx={{ mb: 4 }} // Alttan boşluk
      >
        <MuiLink // Material UI'ın Link'ini kullanıyoruz
          component={RouterLink} // React Router'ın Link'ini render etmesini sağlıyoruz
          to="/" // React Router'ın Link'ine özgü 'to' prop'u
          color="inherit" 
          underline="hover" 
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography variant="body1" color="text.secondary">
            Dashboard
          </Typography>
        </MuiLink>
        <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
          Home
        </Typography>
      </Breadcrumbs>
      
      {/* Gelir ve Gider Genel Bakış Bileşeni */}
      <RevenueExpenseOverview />

      {/* İleride eklenecek diğer dashboard bileşenleri buraya gelecek */}
      <Box sx={{ mt: 5 }}>
        {/* Buraya diğer dashboard bölümleri eklenebilir */}
      </Box>
    </Box>
  );
}

export default DashboardPage;
