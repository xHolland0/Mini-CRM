import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar'; // AppBar'ın yüksekliği kadar boşluk bırakmak için
import MainAppBar from './MainAppBar';
import SideNavigation from './SideNavigation'; // SideNavigation component'ini içe aktar

const drawerWidth = 240; // SideNavigation'daki genişlikle aynı olmalı

/**
 * Uygulamanın ana Dashboard düzenini sağlayan bileşen.
 * Üst navigasyon çubuğunu (MainAppBar) ve sol Sidebar'ı içerir.
 * Ana içeriği Sidebar'ın yanında gösterir.
 */
function DashboardLayout({ children, onNavigate }: { children: React.ReactNode, onNavigate: (page: string) => void }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Üst Navigasyon Çubuğu */}
      <MainAppBar />

      {/* Sol Sidebar */}
      <SideNavigation onNavigate={onNavigate} />

      {/* Ana İçerik Alanı */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // Sidebar kadar boşluk bırak
          ml: { sm: `${drawerWidth}px` }, // Sidebar'ın sağında başla
        }}
      >
        <Toolbar /> {/* AppBar'ın altındaki boşluğu sağlamak için */}
        {children} {/* Bu prop, DashboardLayout'un içine yerleştirilen diğer component'leri temsil eder */}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
