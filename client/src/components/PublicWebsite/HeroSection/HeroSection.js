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
    textAlign: 'right',
    fontWeight: 'bold',
    maxWidth: '600px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  heroSubtitle: {
    textAlign: 'right',
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
      justifyContent="right" 
      alignItems="center" 
      display={'flex'} 
      height= '100%'
      >
        <Box>
          <Typography variant="h2" className={classes.heroText}>
            Welcome to the webstore of the Bulgarian Academy of sciences
          </Typography>
          <Typography variant="subtitle1" className={classes.heroSubtitle}>
            The Bulgarian Academy of sciences is the shitties place on earth. It is fucking horrible.
            They hire fucking idiots who can't do their fucking job. The fucking grandma can go die under a fucking bridge.
            They take 95 million euro from the EU for no fucking reason. KYS Ban. Thank you.
          </Typography>
          <Box display={'flex'} justifyContent='right'>
            <Button variant="contained" color="bordoRed" component={Link} to="/products">
              Shop Now
            </Button>
          </Box>
          
        </Box>
      </Box>
    </Container>

  );
};

export default HeroSection;