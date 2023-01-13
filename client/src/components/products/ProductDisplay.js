import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
  productContainer: {
    backgroundColor: 'white',
    padding: '3rem'
  },
  productCard: {
    width: '20rem',
    height: '30rem',
    margin: '30px',
  },
  productImage: {
    height: '15rem'
  },
  productTitle: {
    fontWeight: 'bold'
  },
  productButton: {
    marginTop: '1rem'
  }
});

const ProductDisplay = () => {
  const classes = useStyles();
  const products = [
    {
      id: 1,
      name: "Lab Glass Beaker",
      imageUrl: "https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png",
      description: "This lab glass beaker is perfect for mixing and heating liquids in the lab.",
      price: "19.99"
    },
    {
      id: 2,
      name: "Lab Glass Test Tube",
      imageUrl: "https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png",
      description: "This lab glass test tube is great for conducting experiments and observing chemical reactions.",
      price: "4.99"
    },
    {
      id: 3,
      name: "Lab Glass Microscope Slide",
      imageUrl: "https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png",
      description: "This lab glass microscope slide is perfect for studying samples under a microscope.",
      price: "9.99"
    },
    {
      id: 4,
      name: "Lab Glass Petri Dish",
      imageUrl: "https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png",
      description: "This lab glass petri dish is perfect for growing and studying cultures of bacteria.",
      price: "14.99"
    },
    {
        id: 5,
        name: "Lab Glass Beaker",
        imageUrl: "https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png",
        description: "This lab glass beaker is perfect for mixing and heating liquids in the lab.",
        price: "19.99"
      },
      {
        id: 6,
        name: "Lab Glass Test Tube",
        imageUrl: "https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png",
        description: "This lab glass test tube is great for conducting experiments and observing chemical reactions.",
        price: "4.99"
      },
      {
        id: 7,
        name: "Lab Glass Microscope Slide",
        imageUrl: "https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png",
        description: "This lab glass microscope slide is perfect for studying samples under a microscope.",
        price: "9.99"
      },
      {
        id: 8,
        name: "Lab Glass Petri Dish",
        imageUrl: "https://cdn.discordapp.com/attachments/1008571217004990565/1063523481897156739/Knifsy_laboratory_glass_filled_with_red_crystals_on_a_white_bac_0855b009-84b9-4466-b89e-5c4fdc9cdc01.png",
        description: "This lab glass petri dish is perfect for growing and studying cultures of bacteria.",
        price: "14.99"
      }
  ];

  return (
    <Grid container className={classes.productContainer} justify="center" alignItems="center">
      {products.map((product) => (
        <Grid item key={product.id}>
          <Card className={classes.productCard}>
            <CardMedia
              className={classes.productImage}
              image={product.imageUrl}
              title={product.name}
            />
            <CardContent>
              <Typography variant="h5" className={classes.productTitle}>
                {product.name}
              </Typography>
              <Typography variant="subtitle1">
                {product.price}
              </Typography>
              <Button variant="contained" color="secondary" className={classes.productButton} component={Link} to={`/product/${product.id}`}>
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductDisplay;