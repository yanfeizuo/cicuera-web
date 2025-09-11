import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {
  Box, Drawer, Divider, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography,
  Stack,
  Button
} from '@mui/material';
import BankIcon from '@mui/icons-material/AccountBalance';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { JWT_TOKEN } from '@/app/constants';

export const drawerWidth = 240;

interface Props {
  setIsClosing: (isClosing: boolean) => void
}
const SideNav = ({ setIsClosing }: Props) => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter()

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const goWallet = () => {
    router.push('/dashboard/wallet')
  }
  const goBank = () => {
    router.push('/dashboard/bank')
  }

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN)
    router.push('/')
  }

  const drawer = (
    <Stack justifyContent={'space-between'} flexGrow={1}>
      <Stack>
        <Toolbar>
          <Typography variant='h5'>Cicuera</Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={goWallet}>
              <ListItemIcon>
                <WalletIcon />
              </ListItemIcon>
              <ListItemText primary={'wallet'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={goBank}>
              <ListItemIcon>
                <BankIcon />
              </ListItemIcon>
              <ListItemText primary={'bank'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>

      <Box sx={{ px: 2 }}>
        <Button fullWidth variant='contained' onClick={logout}>Logout</Button>
      </Box>
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Better open performance on mobile.
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default SideNav