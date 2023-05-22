import React from 'react';
import { Box, Typography, Button, CardMedia, Card, duration } from '@mui/material';
import "./AchievementCss.css"
import { animated, useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
function Achievement(props) {
    const { icon: Icon } = props;

    const { ref, inView } = useInView({
        /* Optional options */
        triggerOnce: true,
        threshold: 0.4,
    });

    const styles = useSpring({
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 100,
        config: { duration: 700 }
    })
    return (
        <animated.div style={styles} ref={ref}>
            <Box display={{md:'block', lg:'flex'}} sx={{ mb:5 }} flexDirection={props.reverse? 'row-reverse' : 'row'} width={'100%'}>
                <Box flex={1} sx={{ textAlign: 'center', borderRadius:'10px', overflow:'hidden' }}>
                    <img style={{objectFit:'cover', width:'100%'}} src='https://www.audemarspiguet.com/etc.clientlibs/ap-com/ui/clientlibs/calibre-1000/resources/images/design/Watch_Variation_06_qggoom_c_scale,w_1977.webp' />
                </Box>
                <Box flex={1} sx={{
                    textAlign:!props.reverse? 'center' : 'left',
                }}>
                    <Box sx={{ 
                        p:{lg:0, xl:10}, 
                        display:'flex', 
                        flexDirection:'column',
                        justifyContent:'space-evenly'
                    }}>
                        <Typography sx={{ fontSize:'220%'}}>{props.title}</Typography>
                        <Typography sx={{ fontSize:'120%'}}>{props.desc}</Typography>
                    </Box>
                </Box>
            </Box>
            
        </animated.div>
    )
}

export default Achievement;