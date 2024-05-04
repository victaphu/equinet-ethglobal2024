import React, { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Select, MenuItem, InputLabel, Paper } from '@mui/material';

function Filters({ onChange, onReset }: any) {
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [sire, setSire] = useState('');
  const [trainer, setTrainer] = useState('');
  const [syndicator, setSyndicator] = useState('');
  const [sex, setSex] = useState('');

  const handleSubmit = () => {
    onChange({ price, location, sire, trainer, syndicator, sex });
  };

  return (
    <Paper sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 2,
      padding: 2,
      margin: 'auto',
      maxWidth: 960,
      backgroundImage: 'url(/horses/background.jpeg)',
      backgroundSize: 'cover',
      opacity: 0.9,
      color: 'white'
    }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Price</FormLabel>
        <RadioGroup row name="price" value={price} onChange={(e) => setPrice(JSON.parse(e.target.value))}>
          <FormControlLabel value='{"min": 0, "max": 100}' control={<Radio />} label="Under $100" />
          <FormControlLabel value='{"min": 100, "max": 200}' control={<Radio />} label="$100 to $200" />
          <FormControlLabel value='{"min": 200, "max": 300}' control={<Radio />} label="$200 to $300" />
          <FormControlLabel value='{"min": 300, "max": 400}' control={<Radio />} label="Over $300" />
        </RadioGroup>
      </FormControl>
      {/* Additional filters for location, sire, trainer, syndicator, sex similar to price */}
      <Box>
        <InputLabel id="location-label">Location</InputLabel>
        <Select
          labelId="location-label"
          id="location-select"
          value={location}
          label="Location"
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        >
          {/* Populate these options based on your data */}
          <MenuItem value="Lexington, KY">Lexington, KY</MenuItem>
          <MenuItem value="Dubai, UAE">Dubai, UAE</MenuItem>
        </Select>
      </Box>
      {/* Repeat for other filters */}
      <Button onClick={handleSubmit} sx={{ gridColumn: 'span 3' }}>Apply Filters</Button>
      <Button onClick={onReset} sx={{ gridColumn: 'span 3' }}>Reset Filters</Button>
    </Paper>
  );
}

export default Filters;