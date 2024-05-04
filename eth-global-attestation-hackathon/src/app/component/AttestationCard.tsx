import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

function AttestationCard({ title, description, icon, onVerify, verified }: any) {
  return (
    <Card className="mx-auto my-4 max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4 p-4">
        <CardMedia
          component="img"
          alt={`${title} Icon`}
          height="80"
          image={icon}
          className="w-20 h-20"
        />
        <div className="flex-grow">
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            {!verified && <Button size="large" onClick={onVerify} className="bg-blue-500 hover:bg-blue-600 text-white">
              Verify
            </Button>}
            {verified && <Button size="large" onClick={onVerify} className="bg-green-500 hover:bg-green-600 text-black" disabled>
              Verified!
            </Button>}
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default AttestationCard;
