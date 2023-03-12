import { Container, Box } from '@mui/material';
import HeroSection from '../../../components/PublicWebsite/home/HeroSection/HeroSection';
import ProductDisplay from '../../../components/PublicWebsite/products/ProductDisplay';
import InformationSection from '../../../components/PublicWebsite//home/InformationSection';
import Achievements from '../../../components/PublicWebsite/home/achievements/Achevements';

const Landing = () => {
    return (
        <>
            <HeroSection />
            <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 10, position: 'relative' }}>
                <ProductDisplay />
            </Container>
            <InformationSection />
            <Achievements />
        </>
    );
}

export default Landing;