import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Container } from '@mui/system';



const useStyles = makeStyles({
    productContainer: {
        backgroundColor: 'white',
        padding: '3rem 0'
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
            description: "This lab glass petri dish is perfect for growing and studying cultures of bacteria. fiaushi uaf uiefh iuwfhweufhweiufhuywegfiwgye iwf uwief iuwefuiw iefw",
            price: "14.99"
        }
    ];

    return (
        <Container maxWidth={false}>
            <Grid container className={classes.productContainer} justifyContent="space-between" alignItems="center" spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} >
                        <ProductCard
                            id={product.id}
                            title={product.name}
                            subtitle={product.description}
                            img={product.imageUrl}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductDisplay;