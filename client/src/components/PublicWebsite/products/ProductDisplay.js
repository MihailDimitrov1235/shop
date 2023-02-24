import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCardTest from './ProductCardTest';
import { Container } from '@mui/system';
import productService from '../../../services/product';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';



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
    },
    Deck: {
        transition: 'transform 0.3s ease',
    },
    DeckSelected: {
        transform: 'scale(1)',
      },
    DeckUnselected: {
        transform: 'scale(0.3)',
      },
      
    swiperFixedWidth300: {
        width: '300px',
    },
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
            <Swiper
                spaceBetween={50}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide className="swiperFixedWidth300">
                        <ProductCardTest/>
                    </SwiperSlide>
            </Swiper>
            {/* <Grid container className={classes.productContainer} justifyContent="space-between" alignItems="center" spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} >
                        <ProductCard
                            product={product}
                        />
                    </Grid>
                ))}
            </Grid> */}
        </Container>
    );
};

export default ProductDisplay;