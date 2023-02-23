import HeroSection from "../../../components/PublicWebsite/HeroSection/HeroSection";
import ProductDisplay from "../../../components/PublicWebsite/products/ProductDisplay";
import { Container } from '@mui/material';
import BgImage from './heroImage.png';

const Landing = () => {
    return (
        <>
            <Container maxWidth={'false'} sx={{
                px: { lg: '130px!important' },
                backgroundImage: `url(${BgImage})`,
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