import { createTheme } from '@mui/material';
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const bordoRedColor = createColor('#96011c');

const theme = createTheme({
  palette: {
    bordoRed: bordoRedColor,
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
      adminMenu: '#4f5d73',
      adminMenuDarker: '#465367',
      bordoRed: '#96011c'
    },
    primary: {
      contrastText: '#96011c',
      main: '#ffffff',
      mainDarker: '#aaaaaa',
      border: '#efefef',
      grey: '#F9FAFB'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
      white: '#ffffff',
      black: '#000000',
      bordoRed: '#96011c'
    }
  },
  shadows: [
    'none',
    '0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 8px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 5px 8px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 12px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 12px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 16px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 16px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 8px 18px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 9px 18px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 10px 20px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 11px 20px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 12px 22px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 13px 22px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 14px 24px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 16px 28px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 18px 30px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 20px 32px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 22px 34px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)'
  ],
  typography: {
    fontFamily: ['MD Nichrome'],
    hero: {
      fontWeight: 700,
      '@media (min-width:0px)': { // xs
        fontSize: '8.5vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '6.5vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '4.5vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '4.5vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '3.5vw',
      },
      letterSpacing: '-0.24px'
    },
    heroSubtitle: {
      '@media (min-width:0px)': { // xs
        fontSize: '3.7vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '2.7vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '2vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '1.4vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '1.2vw',
      },
    },
    h1: {
      fontWeight: 500,
      '@media (min-width:0px)': { // xs
        fontSize: '7.5vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '5vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '4vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '3vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '2vw',
      },
      letterSpacing: '-0.24px'
    },
    h2: {
      fontWeight: 500,
      '@media (min-width:0px)': { // xs
        fontSize: '7vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '4.5vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '3.5vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '2.8vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '2.2vw',
      },
      letterSpacing: '-0.24px'
    },
    h3: {
      fontWeight: 500,
      '@media (min-width:0px)': { // xs
        fontSize: '5.6vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '4.1vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '3.2vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '2.1vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '1.6vw',
      },
      letterSpacing: '-0.06px'
    },
    h4: {
      fontWeight: 500,
      '@media (min-width:0px)': { // xs
        fontSize: '4.2vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '3.2vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '2vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '1.6vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '1.3vw',
      },
      letterSpacing: '-0.06px'
    },
    h5: {
      fontWeight: 500,
      '@media (min-width:0px)': { // xs
        fontSize: '3.4vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '2.9vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '1.8vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '1.3vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '1.1vw',
      },
      letterSpacing: '-0.05px'
    },
    h6: {
      fontWeight: 500,
      '@media (min-width:0px)': { // xs
        fontSize: '3vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '2.5vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '1.7vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '1.2vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '1vw',
      },
      letterSpacing: '-0.05px'
    },
    subtitle1: {
      '@media (min-width:0px)': { // xs
        fontSize: '2.9vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '2.4vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '1.6vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '1.1vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '0.9vw',
      },
    },
    subtitle2: {
      '@media (min-width:0px)': { // xs
        fontSize: '2.8vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '2.3vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '1.5vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '1vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '0.8vw',
      },
    },
    p:{
      '@media (min-width:0px)': { // xs
        fontSize: '2.8vw',
      },
      '@media (min-width:600px)': { // sm
        fontSize: '2.3vw',
      },
      '@media (min-width:900px)': { // md
        fontSize: '1.5vw',
      },
      '@media (min-width:1200px)': { // lg
        fontSize: '1vw',
      },
      '@media (min-width:1536px)': { // xl
        fontSize: '0.8vw',
      },
    },
    span: {
      color: '#96011c'
    },
    overline: {
      fontWeight: 500
    },
  },
  components:{
    MuiNativeSelect:{
      defaultProps:{
        color:'bordoRed'
      }
    },
    MuiSelect:{
      defaultProps:{
        color:'bordoRed'
      }
    },
    MuiTextField:{
      defaultProps:{
        color:'bordoRed'
      }
    },
    MuiChip:{
      styleOverrides: {
        deleteIcon: {
          color: 'white', // Replace 'red' with your desired color
          '&:hover': {
            color: '#c0c0c0', // Replace 'darkred' with your desired hover color
          },
        },
        root: {
          fontSize: '100%',
          background: 'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)',
          color: 'white',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: 'black', // Inactive page number color
            '&.Mui-selected': {
              color: 'white', // Active page number text color
              backgroundColor: '#96011c', // Active page number background color
              '&:hover': {
                backgroundColor: '#96011c', // Hover background color
              },
            },
            '&:hover': {
              backgroundColor: '#96011c', // Hover background color
              color: 'white', // Hover text color
            },
          },
          '& .MuiPaginationItem-ellipsis': {
            '&:hover': {
              backgroundColor: 'transparent !important', // Disable hover effect on ellipsis
              color: 'inherit !important', // Use default text color
            },
          },
        },
      },
    },
  }
});

export default theme;