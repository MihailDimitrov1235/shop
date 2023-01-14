import HeroSection from "../../../components/PublicWebsite/HeroSection/HeroSection";
import ProductDisplay from "../../../components/PublicWebsite/products/ProductDisplay";
import { Container } from '@mui/material';

const Landing = () => {
    return (
        <Container maxWidth={'false'} sx={{
            px: { lg: '130px!important' }
        }}>
            <HeroSection/>
            <ProductDisplay/>
        </Container>
    );
}

export default Landing;