// 'use client';
// import { Container, Box } from '@mui/material';
// import { useRouter } from 'next/router';
import { useTranslation } from '../i18n'
import { Footer } from './components/Footer'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { useState } from 'react';
// import HeroSection from '../src/components/PublicWebsite/home/HeroSection/HeroSection';
// import ProductDisplay from '../components/PublicWebsite/products/ProductDisplay';
// import InformationSection from '../components/PublicWebsite//home/InformationSection';
// import Achievements from '../components/PublicWebsite/home/achievements/Achevements';

async function Home({ params: { lng } }) {
    // const [isMounted, setIsMounted] = useState(false);
    const { t } = await useTranslation(lng)

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);
    
    // const [flipped, setFlipped] = useState(false)

    
    return (
        <>
        <Footer lng={lng}/>
        {/* <Box>{t('blog')}</Box> */}
            {/* <HeroSection />  */}
            {/* <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 10, position: 'relative' }}>
                <ProductDisplay />
            </Container>
            <InformationSection flipped={flipped} setFlipped={setFlipped} /> */}
            {/* <Achievements /> */}
            </>
    );
}

export default Home;