import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard ikonu
import PeopleIcon from '@mui/icons-material/People';     // Kişiler/Kullanıcılar ikonu

// Sidebar genişliği
const drawerWidth = 240;

/**
 * Sol taraftaki navigasyon menüsü (Sidebar) bileşeni.
 * Dashboard, Contacts gibi sayfalara yönlendirme sağlar.
 */
function SideNavigation({ onNavigate }: { onNavigate: (page: string) => void }) {
  // Navigasyon öğelerini tanımla
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
    { text: 'Kullanıcılar', icon: <PeopleIcon />, path: 'users' }, // 'Contacts' yerine 'Users' daha uygun olabilir
    // İleride buraya başka sayfalar eklenebilir (örn: 'Ayarlar', 'Raporlar')
  ];

  return (
    <Drawer
      variant="permanent" // Her zaman görünür olacak
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Menü
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => onNavigate(item.path)}>
                <ListItemIcon>
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
