import React from 'react';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import heroImage from './hero_image.png';
import { Container } from '@mui/system';

const useStyles = makeStyles({
  heroContainer: {
    color: 'black',
    //   height: '100vh',
    //padding: '1.8rem'
  },
  heroText: {
    textAlign: 'left',
    fontWeight: 'bold',
    maxWidth: '600px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  heroSubtitle: {
    textAlign: 'left',
    maxWidth: '600px',
    marginTop: '10px',
    marginBottom: '10px',
  },
});
function HeroSection() {
  const classes = useStyles();
  return (
    <Container maxWidth={false} display='flex' alignItems="center" height='100%' >
      <Box className={classes.heroContainer}
      justifyContent="space-between" 
      alignItems="center" 
      display={'flex'} 
      height= '100%'
      >
        <Box>
          <Typography variant="h2" className={classes.heroText}>
            Welcome to the webstore of the Bulgarian Academy of sciences
          </Typography>
          <Typography variant="subtitle1" className={classes.heroSubtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </Typography>
          <Box display={'flex'} justifyContent='left'>
            <Button variant="contained" color="bordoRed" component={Link} to="/products">
              Shop Now
            </Button>
          </Box>
          
        </Box>
        <Box height={'100%'} justifyContent="right">
        <img src="/static/images/hImage.png" height={'100%'}/>
      </Box>
      </Box>
    </Container>

  );
};

export default HeroSection;