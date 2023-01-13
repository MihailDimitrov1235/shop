import { Container, Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = () => {
    const products = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <Container maxWidth={'false'}>
            <Grid container spacing={2} >
                {products.map((el, index) => (
                    <Grid item sm={12} md={6} lg={4} key={index}>
                        <ProductCard />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductList;