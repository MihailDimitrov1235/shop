import React, {useState} from 'react';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import './HeroSectionCss.css';
import { useSpring, animated} from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useTranslation } from 'react-i18next';

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

    const [{x,y}, api] = useSpring( () => ({
        x: "0",
        y: "0",
      }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({x:hovering? '-5px': '0', y:hovering? '-5px': '0'}),
})

    const springs = useSpring({
        from: { opacity: 0, y: 150},
        to: { opacity: 1, y: 0},
    })

    const classes = useStyles();
    return (
        <Container maxWidth={'false'} className={classes.heroContainer} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            height: 'auto',
            backgroundImage:`url("/static/images/HomeBackground.svg")`,
            backgroundRepeat:'no-repeat',
            backgroundPosition:'right',
            px: { lg: '130px!important' },
            mb: { xs: 30, md: 0 },
        }}>
                <animated.div style={springs}>
                    <Box width={'500px'}>
                        <Typography variant="h1" className={classes.heroText}>
                            {t('hero-title')}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.heroSubtitle}>
                            {t('hero-desc')}
                        </Typography>
                        <Box display={'flex'} justifyContent='left'>
                        <animated.div style={{x:x, y:y}}>
                            <Button {...bind()} variant="contained" color="bordoRed" component={Link} to="/products">
                                {t('hero-button')}
                            </Button>
                            </animated.div>
                        </Box>
                    </Box>
                </animated.div>
                <animated.div style={{width:'60%', justifyContent:"right", ...springs}}>
                    <Box height={'100vh'} justifyContent="right" display={'flex'} alignItems='center' >
                        <img src="/static/images/hImage.png" height={'50%'} className='img' />
                    </Box>
                </animated.div>
        </Container>

    );
};

export default HeroSection;