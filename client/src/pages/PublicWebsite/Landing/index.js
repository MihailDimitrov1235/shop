import HeroSection from "../../../components/PublicWebsite/HeroSection/HeroSection";
import ProductDisplay from "../../../components/PublicWebsite/products/ProductDisplay";
import { Container } from '@mui/material';

const Landing = () => {
    return (
        <>
            <Container maxWidth={'false'} sx={{
                px: { lg: '130px!important' },
                backgroundImage: `url('/static/images/heroImage.png')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '70vh',
                display: 'flex',
            }}>
                <HeroSection/>
            </Container>
            <ProductDisplay/>
        </>
    );
}

export default Landing;