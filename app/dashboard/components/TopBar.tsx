import React from 'react';
import {
  AppBar, IconButton, Toolbar, Typography, Avatar, Stack,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useUserStore } from '../../store/userStore';
import { useShallow } from 'zustand/shallow';
import { drawerWidth } from './SideNav';

interface Props {
  isClosing: boolean
}

const TopBar = (props: Props) => {

  const { isClosing } = props

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { userData } = useUserStore(useShallow(state => ({
    userData: state.userData
  })))

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
        </Typography>

        {
          userData ? (
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Avatar src={userData.avatar} />
                <Typography variant="h6" noWrap component="div">
                  {userData.name}
                </Typography>
              </Stack>
            </Stack>
          ) : null
        }

      </Toolbar>
    </AppBar>
  )
}

export default TopBar