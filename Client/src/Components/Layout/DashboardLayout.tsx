import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar'; 
import MainAppBar from './MainAppBar'; 
import SideNavigation from './SideNavigation'; 
import Drawer from '@mui/material/Drawer'; 

const drawerWidth = 240; // Sidebar genişliği

/**
 * Uygulamanın ana Dashboard düzenini sağlayan bileşen.
 * Sol Sidebar'ı ve sağda sabit MainAppBar ile ana içeriği içerir.
 * Navbar, Sidebar'ın sağında başlar ve ana içerik alanını kapsar.
 */
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sol Sidebar (Drawer) */}
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
          },
        }}
      >
        {/* Sidebar'ın üst kısmında MainAppBar'ın yüksekliği kadar boşluk bırakmak için Toolbar */}
        <Toolbar /> 
        <SideNavigation /> 
      </Drawer>

      {/* Sağdaki Ana İçerik Alanı */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Kalan tüm yatay alanı kapla
          p: 3, // Sayfa içeriği için padding
          ml: `${drawerWidth}px`, // Sidebar'ın sağında başlaması için margin-left
          margin: 0, // <-- Burası eklendi: main etiketi için varsayılan margin'i sıfırlar
        }}
      >
        {/* MainAppBar'ı buraya yerleştiriyoruz ve fixed olarak ayarlıyoruz.
            Sidebar'ın genişliği kadar soldan boşluk bırakarak Sidebar'ın sağında başlamasını sağlıyoruz. */}
        <MainAppBar 
          sx={{ 
            width: `calc(100% - ${drawerWidth}px)`, // Sidebar genişliği kadar daralt
            left: `${drawerWidth}px`, // Sidebar'ın sağından başlat
            top: 0, // En üste sabitle
          }} 
        /> 
        
        {/* AppBar'ın yüksekliği kadar boşluk bırakmak için Toolbar kullanıyoruz */}
        <Toolbar /> 

        {/* Sayfa içeriği için padding ekleyebiliriz */}
        <Box sx={{ p: 3 }}>
          {children} 
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
