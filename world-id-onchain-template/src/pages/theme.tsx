import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E4333',
    },
    secondary: {
      main: 'rgba(197,171,144,0.2)',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#74B49B',
    },
  },
});

export default theme;
