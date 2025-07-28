import { Box, Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function InventoryPage() {
  return (
    <Box
      sx={{
        padding: 3, // Genel sayfa boşluğu
        color: (theme) => theme.palette.text.primary,
      }}
    >
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
          Tasks
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mt: 5 }}></Box>
    </Box>
  );
}

export default InventoryPage;
