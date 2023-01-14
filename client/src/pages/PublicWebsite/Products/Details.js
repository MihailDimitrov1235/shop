import React from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FormControl, MenuItem, InputLabel, Select, Box, Button, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { margin } from '@mui/system';

const useStyles = makeStyles({
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '0 0 35px 0'
  },
  text: {
    padding: '20%',
  },
  button: {
    padding: '10px',
  }
});

const data = {
    title: "Knifsy",
    description: "This is a high-quality knife with a wood handle and a sharp blade.",
    price: 99.99,
    parts:[
      {id:1, price:999},
      {id:2, price:990}
    ],
    image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
  };

const ProductPage = (id) => {
  const [part, setPart] = useState('');
  const [price, setPrice] = useState('');
  const handleChange = (event) => {
    data.parts.forEach(part => {
      if(part.id === event.target.value){
        setPrice(part.price);
      }
    });
    setPart(event.target.value);
  };
  const classes = useStyles();
  return (
    <Card elevation={0}>
      <Grid container>
        <Grid item xs={7}>
          <CardMedia
            className={classes.image}
            // image={props.img}
            // title={props.title}
            component='img'
            title={data.title}
            image={data.image}
          />
        </Grid>
        <Grid item xs={5}>
          <CardContent className={classes.text}>
            <Typography gutterBottom variant="h3" component="h2">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
            <Box display={'flex'} marginTop={'30px'}>
              <Button className={classes.button} variant="contained" color="bordoRed" component={Link} to="/products">
                Buy
              </Button>
              <FormControl fullWidth>
              <InputLabel id="part">Part</InputLabel>
              <Select
                labelId="part"
                id="part"
                value={part}
                label="Part"
                onChange={handleChange}
              >
                {data.parts.map(part => {
                  return(
                    <MenuItem value={part.id}>{part.id}</MenuItem>
                  );
                })}
              </Select>
              </FormControl>
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {price} лв.
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProductPage;