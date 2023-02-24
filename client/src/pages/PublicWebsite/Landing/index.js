import HeroSection from "../../../components/PublicWebsite/HeroSection/HeroSection";
import ProductDisplay from "../../../components/PublicWebsite/products/ProductDisplay";
import { Container } from '@mui/material';

const Landing = () => {
    return (
        <>
            <Container maxWidth={'false'} sx={{
                px: { lg: '130px!important' },
                // backgroundImage: `url('/static/images/hImage.png')`,
                // backgroundPosition: 'center',
                // backgroundSize: 'cover',
                // backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '500px',
                display: 'flex',
            }}>
                <HeroSection/>
            </Container>
            <ProductDisplay/>
        </>
    );
}

export default Landing;