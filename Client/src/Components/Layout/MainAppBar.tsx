import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import type { SxProps, Theme } from "@mui/material/styles";

import { Badge, Divider } from "@mui/material";
import ThemeSwitch from "../ThemeSwitch";
import AuthButton from "../AuthButton";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

/**
 * Uygulamanın ana navigasyon çubuğu (Navbar) bileşeni.
 * Logo/başlık, giriş/çıkış butonları, profil menüsü ve bildirim ikonunu içerir.
 * Sayfanın en üstünde sabitlenir (fixed).
 */
function MainAppBar({ sx }: { sx?: SxProps<Theme> }) {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (path: string) => {
    handleCloseUserMenu();
    navigate(path);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Diğer elementlerin üzerinde olmasını sağla
        borderBottom: 0.1,
        borderColor: (theme) => theme.palette.divider, // Temadan al
        backgroundColor: (theme) => theme.palette.background.paper, // Temadan al
        ...sx, // Dışarıdan gelen sx prop'larını da uygula (width, ml, top gibi)
      }}
      elevation={0}
    >
      <Toolbar>
        <Tooltip title="Search">
          <IconButton
            sx={{
              mr: 1,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <SearchOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated && (
            <Tooltip title="Notifications">
              <IconButton>
                <Badge sx={{ mr: 1 }} badgeContent={100} color="error" showZero>
                  <NotificationsActiveOutlinedIcon
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          <ThemeSwitch />

          {isAuthenticated && (
            <Box sx={{ ml: 2 }}>
              <Tooltip title="Profile Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.name || user?.email}
                    src={user?.picture || ""}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{
                  mt: "45px",
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  sx={{
                    display: "flex",
                    gap: 8,
                  }}
                  onClick={() => handleMenuItemClick("/dashboard/profile")}
                >
                  <Typography
                    textAlign="center"
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    Profile
                  </Typography>

                  <PersonIcon />
                </MenuItem>

                <MenuItem
                  sx={{
                    display: "flex",
                    gap: 6.5,
                  }}
                  onClick={() => handleMenuItemClick("/dashboard/settings")}
                >
                  <Typography
                    textAlign="center"
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    Settings
                  </Typography>

                  <SettingsIcon />
                </MenuItem>

                <Divider />

                <AuthButton />
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
