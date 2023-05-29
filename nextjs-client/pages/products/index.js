import { Container, Grid, Card } from "@mui/material";
import ProductFilters from '../../src/components/PublicWebsite/products/filters/ProductFilters';
import ProductList from "../../src/components/PublicWebsite/products/ProductList";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
                <Grid item xs={12} lg={4}>
                    <ProductFilters />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <ProductList />
                </Grid>
            </Grid>
        </Container>
        </>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

export default Products;