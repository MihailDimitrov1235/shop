import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import productService from '../../../services/product';
import { useTranslation } from 'react-i18next';

const ProductList = () => {
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
    }, [])

    return (
        <Container maxWidth={'false'}>
            <Grid container spacing={2} >
                {products.map((product, index) => (
                    <Grid item sm={12} md={6} lg={4} key={index}>
                        <ProductCard product={product}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductList;