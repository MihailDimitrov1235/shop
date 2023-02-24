import React from 'react';
import { Grid, Typography, Button, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import heroImage from './hero_image.png';
import { Container } from '@mui/system';

const useStyles = makeStyles({
  heroContainer: {
    background: 'white',
    color: 'black',
    //   height: '100vh',
    //padding: '1.8rem'
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
    <Container maxWidth={false}>
      <Grid container className={classes.heroContainer} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={8}>
          <Typography variant="h2" className={classes.heroText}>
            Welcome to the webstore of the Bulgarian Academy of sciences
          </Typography>
          <Typography variant="subtitle1" className={classes.heroSubtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
    </Container>

  );
};

export default HeroSection;