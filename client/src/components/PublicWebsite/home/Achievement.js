import React from 'react';
import { Box, Typography, Button, CardMedia, Card, duration } from '@mui/material';
import "./AchievementCss.css"
import { animated, useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
function Achievement( props ){

    const { ref, inView} = useInView({
        /* Optional options */
        triggerOnce: true,
        threshold: 0.5,
      });

    const styles = useSpring({
        opacity: inView? 1 : 0,
        y: inView? 0 : 40,
        config:{duration:500}
      })
      
      console.log(styles)
    return(
        <animated.div style={styles} ref={ref}>
        <Box textAlign={'center'}>

            <Typography className='topText' 
            marginLeft='auto' 
            marginRight={'auto'}
            width={'100px'}>
                {props.name}
            </Typography>
            <Card className='card'>
                <Box width={'70%'} paddingLeft={'40px'} paddingRight='40px'>
                    {props.desc}
                </Box>
                <Box width={'30%'} height='100%' paddingRight='40px'>
                    <props.icon sx={{
                        height:'100%',
                        width:'100%'
                    }}/>
                </Box>
            </Card>
        </Box>
        </animated.div>
    )
}

export default Achievement;