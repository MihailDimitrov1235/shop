// "use client"
import React from 'react';
// import { Box } from '@mui/material';
// import { makeStyles } from '@mui/styles';    
// import { Link } from 'react-router-dom';
// import { Container } from '@mui/system';
import './HeroSectionCss.css';
// import { useSpring, animated } from '@react-spring/web';
// import { useGesture } from '@use-gesture/react';
import { useTranslation } from '../../../../../i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import Rive from 'rive-react';

async function HeroSection( {lng} ) {

    const { t } = await useTranslation(lng);

    // const [{ x, y }, api] = useSpring(() => ({
    //     x: "0",
    //     y: "0",
    // }));

    // const bind = useGesture({
    //     onHover: ({ hovering }) => api({ x: hovering ? '-5px' : '0', y: hovering ? '-5px' : '0' }),
    // })

    // const springs = useSpring({
    //     from: { opacity: 0, y: 150 },
    //     to: { opacity: 1, y: 0 },
    // })
    
    return (
        <>
            <Box>{t('blog')}</Box>
            
        </>
    );
};

// export async function getServerSideProps({ locale }) {
//     return {
//         props: {}
//     }
// }

export default HeroSection;