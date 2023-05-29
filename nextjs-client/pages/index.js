import { Container, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { useState } from 'react';
import HeroSection from '../src/components/PublicWebsite/home/HeroSection/HeroSection';
// import ProductDisplay from '../components/PublicWebsite/products/ProductDisplay';
import InformationSection from '../src/components/PublicWebsite//home/InformationSection';
// import Achievements from '../components/PublicWebsite/home/achievements/Achevements';

const Home = () => {
    // const { locale, locales, push } = useRouter();
    // const [isMounted, setIsMounted] = useState(false);
    const { t } = useTranslation()

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);
    
    // const [flipped, setFlipped] = useState(false)

    return (
        <>
            <HeroSection />
            {/* <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 10, position: 'relative' }}>
                <ProductDisplay />
            </Container> */}
            <InformationSection />
            {/* <Achievements /> */}
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

export default Home;