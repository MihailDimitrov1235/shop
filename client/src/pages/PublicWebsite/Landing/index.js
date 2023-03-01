import { Container, Box } from '@mui/material';
import HeroSection from '../../../components/PublicWebsite/home/HeroSection/HeroSection';
import ProductDisplay from '../../../components/PublicWebsite/products/ProductDisplay';
import InformationSection from '../../../components/PublicWebsite/InformationSection';
import Achievements from '../../../components/PublicWebsite/home/achievements/Achevements';

const Landing = () => {
    return (
        <>
            <Container maxWidth={'false'} sx={{
                px: { lg: '130px!important' },
                mb: { xs: 30, md: 0 },
                width: '100%',
                height: '500px',
                display: 'flex',
            }}>
                <HeroSection/>
            </Container>
            <ProductDisplay/>
            <InformationSection />
            <Achievements/>
        </>
    );
}

export default Landing;