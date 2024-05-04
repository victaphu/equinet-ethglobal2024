import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
          <img src={'/equinet.png'} alt="Equinet EthGlobal Hackathon" style={{ height: 50 }} className="rounded-xl" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Equinet EthGlobal Hackathon
        </Typography>
        <Box>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
