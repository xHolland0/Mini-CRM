import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';

import AuthButtons from '../AuthButtons';

/**
 * Uygulamanın ana navigasyon çubuğu (Navbar) bileşeni.
 * Logo/başlık, giriş/çıkış butonları, profil menüsü ve bildirim ikonunu içerir.
 */
function MainAppBar() {
  const { isAuthenticated, user } = useAuth0();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (path: string) => {
    handleCloseUserMenu();
    console.log(`Navigating to: ${path}`);
  };

  return (
    // position="fixed" ile AppBar'ı en üste sabitle ve zIndex ile diğer elementlerin üzerinde olmasını sağla
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}> 
      <Toolbar>
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
        >
          Mini CRM
        </Typography>

        <Box sx={{ flexGrow: 1 }} /> 

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isAuthenticated && (
            <Tooltip title="Bildirimler">
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          )}

          <AuthButtons />

          {isAuthenticated && (
            <Box sx={{ ml: 2 }}>
              <Tooltip title="Profil Ayarları">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.name || user?.email} src={user?.picture || ''} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                  <Typography textAlign="center">Profil</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/settings')}>
                  <Typography textAlign="center">Ayarlar</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
