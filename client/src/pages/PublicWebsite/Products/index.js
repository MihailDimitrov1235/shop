import { Container, Grid } from "@mui/material";
import ProductFilters from '../../../components/PublicWebsite/products/ProductFilters';
import ProductList from "../../../components/PublicWebsite/products/ProductList";

const Products = () => {
    return (
        <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 10, p: '0px!important' }}>
            <Grid container spacing={1}>
                <Grid item md={12} lg={4}>
                    <ProductFilters />
                </Grid>
                <Grid item md={12} lg={8}>
                    <ProductList />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Products;