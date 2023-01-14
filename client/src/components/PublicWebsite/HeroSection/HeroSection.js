import React from 'react';
import { Grid, Typography, Button, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import heroImage from './hero_image.png';

const useStyles = makeStyles({
    heroContainer: {
      background: 'white',
      color: 'black',
    //   height: '100vh',
      padding: '3rem'
    },
    heroText: {
      fontWeight: 'bold',
      maxWidth: '600px',
      marginTop: '10px',
      marginBottom: '10px',
    },
    heroImage: {
      width: '30%',
      height: 'auto',
    },
    heroSubtitle: {
        maxWidth: '600px',
        marginTop: '10px',
        marginBottom: '10px',
    },
  });
function HeroSection() {
    const classes = useStyles();
  return (
    <Grid container className={classes.heroContainer} justifyContent="space-between" alignItems="center">
      <Grid item xs={12} sm={8}>
        <Typography variant="h2" className={classes.heroText}>
          Welcome to the webstore of the Bulgarian Academy of sciences
        </Typography>
        <Typography variant="subtitle1" className={classes.heroSubtitle}>
          The Bulgarian Academy of sciences is the shitties place on earth. It is fucking horrible. 
          They hire fucking idiots who can't do their fucking job. The fucking grandma can go die under a fucking bridge. 
          They take 95 million euro from the EU for no fucking reason. KYS Ban. Thank you.
        </Typography>
        <Button variant="contained" color="bordoRed" component={Link} to="/products">
          Shop Now
        </Button>
      </Grid>
        <CardMedia
          className={classes.heroImage}
          component='img'
          image="https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
          title="Hero Image"
        />
    </Grid>
  );
  };

export default HeroSection;