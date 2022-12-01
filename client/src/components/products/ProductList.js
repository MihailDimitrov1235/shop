import { Container, Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = () => {
    const products = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <Container maxWidth={'false'}>
            <Grid container rowGap={3}>
                {products.map((el, index) => (
                    <Grid lg={4}>
                        <ProductCard />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductList;