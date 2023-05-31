import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import Link from 'next/link';
import { useSpring, animated } from '@react-spring/web';
import { useHover } from '@use-gesture/react';

const RequestCard = ({ heading, image, href}) =>{

    const [{ widthFront, rightFront }, apiFront] = useSpring(() => ({ widthFront: '100%', rightFront: '0' }))
    const [{ widthBack }, apiBack] = useSpring(() => ({ widthBack: '100%'}))

    const bind = useHover(( {hovering} ) => {
        apiFront.start({ widthFront: hovering ? '105%' : '100%', rightFront: hovering? '-2.5%': '0'})
        apiBack.start({ widthBack: hovering ? '95%' : '100%'})
    })

    const containerSx = {
        textAlign:'center',
        width:'30%',
        overflow:'visible',
        aspectRatio: '1/1',
        position: 'relative',
    }

    const headingSx = {
        position:'absolute',
        bottom:'5%',
        left: '5%',
        color:'#f0f0f0',
    }

    const backSx = {
        width:'100%',
        height:'100%',
    }

    return(
            <Box sx={containerSx}>
                <Link href={href}>
                    <animated.div {...bind()} style={{ 
                        width: widthFront, 
                        height:widthFront,
                        right:rightFront, 
                        position:'absolute', 
                        background:'linear-gradient(0deg, rgba(198,0,0,0.8) 0%, rgba(176,33,0,0.35) 89%)', 
                        top:0,
                        bottom:0,
                        margin:'auto',
                        zIndex:'2'
                        }}>
                            <Typography variant='h3' sx={headingSx}>{heading}</Typography>
                    </animated.div>
                    <animated.div style={{
                        width:widthBack,
                        height:widthBack,
                        position:'absolute',
                        top:0,
                        bottom:0,
                        right:0,
                        left:0,
                        margin:'auto',
                        zIndex:'1',
                    }}>
                        <img style={{
                            width:'100%',
                            height:'100%',
                            objectFit: 'cover',
                        }} src={image}/>
                    </animated.div>
                        
                </Link>
            </Box>
    )
}

export default RequestCard