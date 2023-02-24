import React from 'react';
import { Box, Typography, Button, CardMedia, Card } from '@mui/material';
import Achievement from './Achievement';
import InventoryIcon from '@mui/icons-material/Inventory';

function Achievements(){

    return(
        <Box marginTop={'100px'} marginBottom='100px'>
            <Typography variant='h3' textAlign={'center'}>
                Нашите постижения
            </Typography>
            <Box display={'flex'} width='100%' height={'300px'}>
                <Box display={'flex'} width='50%' justifyContent={'center'} alignItems='center'>
                    <Achievement name="Products" desc="Имаме над 3000+ научни разработки за продажба" icon={InventoryIcon}/>
                </Box>
                <Box display={'flex'} width='50%' justifyContent={'center'} alignItems='center'>
                    <Achievement name="Products" desc="Имаме над 3000+ научни разработки за продажба" icon={InventoryIcon}/>
                </Box>
            </Box>
            <Box display={'flex'} width='100%' height={'300px'}>
                <Box display={'flex'} width='50%' justifyContent={'center'} alignItems='center'>
                    <Achievement name="Products" desc="Имаме над 3000+ научни разработки за продажба" icon={InventoryIcon}/>
                </Box>
                <Box display={'flex'} width='50%' justifyContent={'center'} alignItems='center'>
                    <Achievement name="Products" desc="Имаме над 3000+ научни разработки за продажба" icon={InventoryIcon}/>
                </Box>
            </Box>
        </Box>
    );
}

export default Achievements;