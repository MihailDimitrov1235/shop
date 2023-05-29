import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { useState } from 'react';
import HeroSection from '../src/components/PublicWebsite/home/HeroSection/HeroSection';
// import ProductDisplay from '../components/PublicWebsite/products/ProductDisplay';
import InformationSection from '../src/components/PublicWebsite//home/InformationSection';
import Achievements from '../src//components/PublicWebsite/home/achievements/Achevements';

const Home = () => {
    const { t } = useTranslation()

    return (
        <>
            <HeroSection />
            {/* <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 10, position: 'relative' }}>
                <ProductDisplay />
            </Container> */}
            <InformationSection />
            <Achievements />
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