'use client'
import {
  Toolbar, Box
} from '@mui/material';

import TopBar from './components/TopBar';
import { useState } from 'react';
import SideNav, { drawerWidth } from './components/SideNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const [isClosing, setIsClosing] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar isClosing={isClosing} />
      <SideNav setIsClosing={setIsClosing} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        { children }
      </Box>
    </Box>
  )
}