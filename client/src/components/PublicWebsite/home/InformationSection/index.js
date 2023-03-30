import {
    Box,
    Typography
} from '@mui/material';
import { Container } from '@mui/system';
import { useTranslation } from 'react-i18next';
import React, {useState} from 'react';
import { useSpring, animated } from '@react-spring/web'
import './styles.css';

const InformationSection = () => {

    const [flipped, setFlipped] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 450, friction: 70 },
    })

    const { t } = useTranslation();
    return (
        <>
            <img style={{ width: '100%' }} src='/static/images/Top.svg' alt="curve" />

            <Box style={{
                background:"linear-gradient(90deg, rgba(255,23,48,1) 0%, rgba(133,1,28,1) 100%)",
            }}>
                <Container
                    maxWidth={'false'}
                    sx={{
                        display:'flex',
                        width: '85%',
                        margin: '0 auto',
                        py: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', lg: 'row' },
                        gap: 15
                    }}
                >
                    <Box sx={{ textAlign: 'center', flexBasis: '80%' }}>
                        <Typography
                            variant='h1'
                            sx={{
                                fontSize: {xs: '5vw', sm:'4vw', lg:'2.5vw'},
                                color: 'white',
                                fontWeight: 800,
                                position: 'relative',
                                ':after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '70%',
                                    height: '3px',
                                    bottom: '-10px',
                                    left: '15%',
                                    borderBottom: '3px dashed',
                                    borderColor: 'white'
                                }
                            }}
                        >
                            {t('information-title')}
                        </Typography>
                        <Typography
                            component='p'
                            sx={{ fontSize: {xs: '2.5vw', sm:'2vw', lg:'1.2vw'}, color: 'white', fontWeight: 800, mt: '100px' }}
                        >
                            {t('information-desc')}
                        </Typography>
                    </Box>

                    <Container className={'container'} onClick={() => setFlipped(state => !state)}>
                        <animated.div
                            className={'image back'}
                            style={{ opacity: opacity.to(o => 1 - o), transform }}
                        >
                            <img className='informationImg' src="https://www.bas.bg/wp-content/uploads/2017/10/Ban_Zgrada_Tzentr_Vhod-1024x615.jpg"/>
                        </animated.div>
                        <animated.div
                            className={'image front'}
                            style={{
                            opacity,
                            transform,
                            rotateX: '180deg',
                            }}
                        >
                            <img className='informationImg' src="https://www.uni-sofia.bg/var/ezwebin_site/storage/images/media/images/18_a2/1327379-1-bul-BG/18_a.jpg"/>
                        </animated.div>
                    </Container>
                </Container>
            </Box>

            <img style={{ width: '100%' }} src='/static/images/Bottom.svg' alt="curve" />
        </>
    );
}

export default InformationSection;