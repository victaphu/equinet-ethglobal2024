import React, { useMemo } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import useAttestation from '@/hooks/useAttestations';

function Header({onConnect, address, disconnect}: any) {
  const { attestationStatus, isLoading } = useAttestation(address);
  console.log(attestationStatus, isLoading, attestationStatus.filter(e=> e === false));
  const HeaderButton = useMemo(() => {
    if (address && address.length > 0) {
      return <><span className="text-sm">{address}</span><Button color="inherit" onClick={disconnect}>Disconnect</Button></>
    }
    else {
      return <Button color="inherit" onClick={onConnect}>Connect</Button>; 
    }
  }, [address]);
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
          {address && address.length > 0 && !isLoading && attestationStatus.filter(e=>e === false).length > 0 && <Button color="inherit">Not Compliant!</Button>}
          {HeaderButton}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
