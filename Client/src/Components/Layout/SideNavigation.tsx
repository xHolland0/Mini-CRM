import { Link } from 'react-router-dom';
import {
  Drawer, // Drawer'ı tekrar buraya alıyoruz
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar, // AppBar'ın yüksekliği kadar boşluk bırakmak için
  Typography, // İsterseniz buraya bir başlık ekleyebilirsiniz
  Box
} from '@mui/material';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const drawerWidth = 240; // Sidebar genişliği

/**
 * Sol taraftaki navigasyon menüsü (Sidebar) içeriği bileşeni.
 * Drawer bileşenini kendi içinde yönetir ve AppBar'ın altından başlar.
 */
function SideNavigation() {
  const navItems = [
    { text: 'Dashboard', icon: <HomeOutlinedIcon />, path: '/dashboard' },
  ];

  return (
    <Drawer
      variant="permanent" // Her zaman görünür olacak
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          // Sidebar'ı AppBar'ın altından başlatmak için top boşluğu
          top: 0, // Sidebar'ın en üstten başlamasını sağlıyoruz
          height: '100vh', // Tam yüksekliği kaplamasını sağlıyoruz

          backgroundColor: '#212121',
          color:'White'
        },
      }}
    >
      {/* Sidebar'ın en üst kısmında, MainAppBar'ın yüksekliği kadar boşluk bırakmak için Toolbar */}
      <Toolbar>
        <Typography variant="h4" noWrap component="div" textAlign="center" fontWeight={600}>Mini CRM</Typography> 
      </Toolbar> 
      <Box sx={{ overflow: 'auto', bgcolor: '#212121',}}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding >
              <ListItemButton 
                sx={{color:'GrayText'}}
                component={Link} 
                to={item.path}   
              >
                <ListItemIcon sx={{color:'GrayText'}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideNavigation;
