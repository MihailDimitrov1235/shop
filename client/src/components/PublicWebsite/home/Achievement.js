import React from 'react';
import { Box, Typography, Button, CardMedia, Card } from '@mui/material';
import "./AchievementCss.css"
import { width } from '@mui/system';
function Achievement( props ){
    return(
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
    )
}

export default Achievement;