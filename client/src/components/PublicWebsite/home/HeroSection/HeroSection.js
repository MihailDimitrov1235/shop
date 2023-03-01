import React, {useState} from 'react';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import './HeroSectionCss.css';
import { useSpring, animated} from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

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
        <Container maxWidth={'false'} sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
        }}>
            <Box
                className={classes.heroContainer}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    justifyContent:'space-around',
                }}
            >
                <animated.div style={springs}>
                    <Box>
                        <Typography variant="h2" className={classes.heroText}>
                            Welcome to the webstore of the Bulgarian Academy of sciences
                        </Typography>
                        <Typography variant="subtitle1" className={classes.heroSubtitle}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Typography>
                        <Box display={'flex'} justifyContent='left'>
                        <animated.div style={{x:x, y:y}}>
                            <Button {...bind()} variant="contained" color="bordoRed" component={Link} to="/products">
                                
                                    Shop now
                            </Button>
                            </animated.div>
                        </Box>
                    </Box>
                </animated.div>
                <animated.div style={{height:'100%', justifyContent:"right", ...springs}}>
                    <Box height={'100%'} justifyContent="right" >
                        <img src="/static/images/hImage.png" height={'100%'} className='img' />
                    </Box>
                </animated.div>
            </Box>
        </Container>

    );
};

export default HeroSection;