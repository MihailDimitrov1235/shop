import React, { useState } from 'react';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import './HeroSectionCss.css';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useTranslation } from 'react-i18next';
import Rive from 'rive-react';

const useStyles = makeStyles({
    heroContainer: {
        color: 'black',
        //   height: '100vh',
        //padding: '1.8rem'
    },
    heroText: {
        textAlign: 'left',
        fontWeight: 'bold',
        maxWidth: '600px',
        marginTop: '10px',
        marginBottom: '10px',
    },
    heroSubtitle: {
        textAlign: 'left',
        //maxWidth: '600px',
        marginTop: '10px',
        marginBottom: '10px',
    },
    // heroImg: {
    //   height: '40%!important',
    //   border: 'solid red 1px',
    //   '&:hover': {
    //     border: 'solid red 1px',      
    //   }
    // },
});
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

    const classes = useStyles();
    return (
        <Box sx={{
            backgroundImage: `url("/static/images/HomeBackground.svg")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
            backgroundSize: { xs: '100% 100%', md: 'auto' },
            height: '100vh'
        }}>

            <Container maxWidth={'false'} className={classes.heroContainer} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', md: 'row' },
                height: 'auto',
                width: '85%',
                margin: '0 auto'
            }}>
                <animated.div style={{ ...springs, flexBasis: '40%' }}>
                    <Box>
                        <Typography variant="h1" className={classes.heroText}>
                            {t('hero-title')}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.heroSubtitle}>
                            {t('hero-desc')}
                        </Typography>
                        <Box display={'flex'} justifyContent='left'>
                            <animated.div style={{ x: x, y: y }}>
                                <Button {...bind()} variant="contained" color="bordoRed" component={Link} to="/products">
                                    {t('hero-button')}
                                </Button>
                            </animated.div>
                        </Box>
                    </Box>
                </animated.div>
                <animated.div style={{ width: '60%', justifyContent: "right", ...springs }}>
                    <Box height={'900px'} justifyContent="right" display={'flex'} alignItems='center'  >
                        <Rive src="/static/images/lab_equipment_bubbles.riv" stateMachines="State Machine 1" />
                    </Box>
                </animated.div>
            </Container>
        </Box>
    );
};

export default HeroSection;