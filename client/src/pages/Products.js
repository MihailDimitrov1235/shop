import { Container, Grid, Box } from "@mui/material";
import ProductFilters from '../components/products/ProductFilters';
import ProductList from "../components/products/ProductList";

const Products = () => {
    return (
        <Container maxWidth={'false'} sx={{ mx: '300px', width: 'auto', mt: 10 }}>
            <Grid container spacing={2}>
                <Grid lg={4}>
                    <ProductFilters />
                </Grid>
                <Grid lg={8}>
                    <ProductList />
                </Grid>
            </Grid>
        </Container>
    //     <Container maxWidth="max-content" >
    //     <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
    //   </Container>
    );
}

export default Products;