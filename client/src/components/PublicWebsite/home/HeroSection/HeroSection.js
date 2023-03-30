import React, { useState } from 'react';
import { Box, Typography, Button, CardMedia, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import './HeroSectionCss.css';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useTranslation } from 'react-i18next';
import Rive from 'rive-react';

function HeroSection() {

    const { t } = useTranslation();

    const [{ x, y }, api] = useSpring(() => ({
        x: "0",
        y: "0",
    }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({ x: hovering ? '-5px' : '0', y: hovering ? '-5px' : '0' }),
    })

    const springs = useSpring({
        from: { opacity: 0, y: 150 },
        to: { opacity: 1, y: 0 },
    })

    return (
        <>
            <Hidden mdUp>
                <Box style={{ height: '300px' }}>
                    <img src='/static/images/HomeTop.svg' />
                </Box>
            </Hidden>
            <Box sx={{
                backgroundImage: { xs: 'none', md: `url("/static/images/HomeBackground.svg")` },
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                backgroundSize: { xs: '100% 100%', md: 'auto' },
                height: '100vh'
            }}>

                <Container maxWidth={'false'} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', md: 'row' },
                    height: 'auto',
                    width: '85%',
                    margin: '0 auto'
                }}>
                    <animated.div style={{ ...springs, flexBasis: '40%' }}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography variant="h1" sx={{
                                fontWeight:'bold',
                                marginTop: '10px',
                                marginBottom: '10px',
                            }}>
                                {t('hero-title')}
                            </Typography>
                            <Typography variant="subtitle1" sx={{
                                marginTop: '10px',
                                marginBottom: '10px',
                            }}>
                                {t('hero-desc')}
                            </Typography>
                            <Box>
                                <animated.div style={{ x: x, y: y, textAlign:'center', width:'fit-content'}}>
                                    <Button {...bind()} variant="contained" color="bordoRed" component={Link} to="/products" >
                                        <Typography variant='subtitle2'>
                                            {t('hero-button')}
                                        </Typography>
                                    </Button>
                                </animated.div>
                            </Box>
                        </Box>
                    </animated.div>
                    <animated.div style={{ ...springs, marginRight:'auto' }}>
                        <Box sx={{ height: { xs: '50vh', sm: '70vh', md: '700px', lg: '900px' }, width: { xs: '100%', md: '50vw' }}}>
                            <Rive src="/static/images/lab_equipment_bubbles.riv" stateMachines="State Machine 1" />
                        </Box>
                    </animated.div>
                </Container>
            </Box>
        </>
    );
};

export default HeroSection;