import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from './ProductCard';
import { Container } from '@mui/system';
import productService from '../../../services/product';
import { useTranslation } from 'react-i18next';



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
    const [products, setProducts] = useState([]);
    const { i18n } = useTranslation();

    useEffect(() => {
        const pagination = {
            page: 1,
            total: 10
        }

        productService.getProducts(pagination, [], {}, i18n.language)
            .then((res) => {
                setProducts(res.data.data);
                //setTotal(res.data.total);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return (
        <Container maxWidth={false}>
            <Grid container className={classes.productContainer} justifyContent="space-between" alignItems="center" spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} >
                        <ProductCard
                            product={product}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductDisplay;