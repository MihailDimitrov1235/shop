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
      width: '50%',
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
    <Grid container className={classes.heroContainer} justify="center" alignItems="center">
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
      <Grid item xs={12} sm={4}>
        <CardMedia
          className={classes.heroImage}
          image="https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png"
          title="Hero Image"
        />
      </Grid>
    </Grid>
  );
  };

export default HeroSection;