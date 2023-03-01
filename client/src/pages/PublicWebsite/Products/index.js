import { Container, Grid, Card } from "@mui/material";
import ProductFilters from '../../../components/PublicWebsite/products/filters/ProductFilters';
import ProductList from "../../../components/PublicWebsite/products/ProductList";

const Products = () => {
    return (
        <>
        <div style={{
            position:'absolute',
            width:'100%',
            height:'200px',
            backgroundImage: `url("/static/images/heroImage.png")`,
            zIndex:0,
        }}/>
        <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 10, p: '0px!important', zIndex:1 }}>
            <Grid container spacing={1}>
                <Grid item md={12} lg={4}>
                    <ProductFilters />
                </Grid>
                <Grid item md={12} lg={8}>
                    <ProductList />
                </Grid>
            </Grid>
        </Container>
        </>
    );
}

export default Products;