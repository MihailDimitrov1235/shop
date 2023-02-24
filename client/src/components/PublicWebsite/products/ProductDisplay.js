import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCardTest from './ProductCardTest';
import { Container } from '@mui/system';
import productService from '../../../services/product';
import { useTranslation } from 'react-i18next';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './styles.css'


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
        <Container maxWidth={false} sx={{ width: '85%', margin: '0 auto', my: 10, p: '0px!important' }}>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
            </Swiper>
            <div className='swiper-button-container'>
                <div className="icon-arrow-long-right swiper-button-next"></div>
                <div className="icon-arrow-long-left swiper-button-prev"></div>
            </div>
        </Container>
    );
};

export default ProductDisplay;