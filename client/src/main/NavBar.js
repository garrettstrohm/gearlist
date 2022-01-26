import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useState} from 'react'
import SideDrawer from './SideDrawer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [state, setState] = useState({
    left: false,
  });
  const user = useSelector(state => state.user.user)
  const navigate = useNavigate()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    function logout(){
        fetch("/logout", {method: "DELETE"})
        .then(()=> navigate('/login'))
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" sx={{backgroundColor: "#ABEBC6"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "#5D6D7E" }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", cursor: "pointer" }} onClick={() => navigate('/')}>
            GearList
          </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{color: "#5D6D7E"}}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate(`/myprofile/${user.id}`)}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
                <SideDrawer state={state} setState={setState} toggleDrawer={toggleDrawer}/>
              </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
