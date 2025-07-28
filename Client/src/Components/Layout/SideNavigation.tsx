import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TaskIcon from '@mui/icons-material/Task';

const drawerWidth = 240; // Sidebar genişliği

/**
 * Sol taraftaki navigasyon menüsü (Sidebar) içeriği bileşeni.
 * Drawer bileşenini kendi içinde yönetir ve AppBar'ın altından başlar.
 */
function SideNavigation() {
  const navItems = [
    { text: 'Dashboard', icon: <HomeOutlinedIcon />, path: '/dashboard' },
    { text: 'Inventory', icon: <WidgetsIcon />, path: '/dashboard/inventory' },
    { text: 'Employees', icon: <PeopleAltIcon />, path: '/dashboard/employees' },
    { text: 'Notes', icon: <EventNoteIcon />, path: '/dashboard/notes' },
    { text: 'Tasks', icon: <TaskIcon />, path: '/dashboard/tasks' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: 0,
          height: '100vh',
          backgroundColor: (theme) => theme.palette.background.paper, // Temadan al
          color: (theme) => theme.palette.text.primary, // Temadan al
        },
      }}
    >
      {/* Sidebar'ın en üst kısmında, MainAppBar'ın yüksekliği kadar boşluk bırakmak için Toolbar */}
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          textAlign="center"
          fontWeight={600}
          sx={{
            color: (theme) => theme.palette.text.primary, 
          }}
        >
          Mini Ecboard
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  color: (theme) => theme.palette.text.secondary, // Temadan al
                }}
                component={Link}
                to={item.path}
              >
                <ListItemIcon
                  sx={{
                    color: (theme) => theme.palette.text.secondary, // Temadan al
                  }}
                >
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