import { Container, Box } from '@mui/material';
import HeroSection from '../components/PublicWebsite/home/HeroSection/HeroSection';
import ProductDisplay from '../components/PublicWebsite/products/ProductDisplay';
import InformationSection from '../components/PublicWebsite//home/InformationSection';
import Achievements from '../components/PublicWebsite/home/achievements/Achevements';

const Home = () => {
    const [flipped, setFlipped] = useState(false)
    return (
        <>
            <HeroSection />
            <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 10, position: 'relative' }}>
                <ProductDisplay />
            </Container>
            <InformationSection flipped={flipped} setFlipped={setFlipped} />
            <Achievements />
        </>
    );
}

export default Home;