import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Chip } from '@mui/material';

function HorseCard({ horse, purchaseEnabled, isLoading, attestationStatus }: any) {
  const compliant = attestationStatus.filter((e: any) => e === false).length === 0;
  return (
    <Card sx={{
      maxWidth: 345,
      width: 345,
      m: 2,
      height: 600,
      position: "relative",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: 3, // Adds a subtle shadow to make the card pop
      border: '1px solid #A38D57', // Adds a border using the tertiary color
      borderRadius: '16px', // Rounded corners for a softer, more polished look
      '&:hover': {
        boxShadow: 6, // Increases shadow when hovered for a dynamic effect
      }
    }}>
      <CardMedia
        component="img"
        sx={{ height: 340, objectFit: 'cover', width: '100%', position: 'relative' }}
        image={horse.image}
        alt={horse.name}
      >
      </CardMedia>
      {horse.syndicator && <Chip label="Syndicated" color="primary" sx={{ position: 'absolute', top: 5, left: 5 }} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {horse.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {horse.age} | Breed: {horse.breed} | Sex: {horse.sex}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sire: {horse.sire} | Location: {horse.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {horse.trainer ? `Trainer: ${horse.trainer}` : `Syndicator: ${horse.syndicator}`}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Shares: {horse.shares} - ${horse.pricePerShare}/share
        </Typography>
      </CardContent>
      <CardActions>
        {purchaseEnabled && !isLoading && compliant && <Button size="small">Buy Shares</Button>}
        {purchaseEnabled && !isLoading && !compliant && <Button size="small" onClick={e=>window.open('http://localhost:3001')}><span className='text-sm bg-red-300 rounded-lg'>Complete Identity Attestation to Purchase</span></Button>}
        {!purchaseEnabled && <Button size="small" disabled>Login to Purchase!</Button>}

      </CardActions>
    </Card>
  );
}

export default HorseCard;
