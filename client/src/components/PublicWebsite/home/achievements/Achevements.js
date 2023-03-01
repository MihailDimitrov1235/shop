import React from 'react';
import { Box, Typography, Button, CardMedia, Card, Grid, Container } from '@mui/material';
import Achievement from './Achievement';
import InventoryIcon from '@mui/icons-material/Inventory';

function Achievements() {

    return (
        <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto' }}>
            <Box sx={{ my: '100px' }}>
                <Typography variant='h3' textAlign={'center'}>
                    Нашите постижения
                </Typography>
                <Grid
                    container
                    spacing={4}
                    columnSpacing={{ md: 20, lg: 40 }}
                    justifyContent='space-between'
                    sx={{ mt: 5 }}
                >
                    <Grid item md={6}>
                        <Achievement name="Products" desc="Имаме над 3000+ научни разработки за продажба" icon={InventoryIcon} />
                    </Grid>
                    <Grid item md={6}>
                        <Achievement name="Products" desc="Имаме над 3000+ научни разработки за продажба" icon={InventoryIcon} />
                    </Grid>
                    <Grid item md={6}>
                        <Achievement name="Products" desc="Имаме над 3000+ научни разработки за продажба" icon={InventoryIcon} />
                    </Grid>
                    <Grid item md={6}>
                        <Achievement name="Products" desc="Имаме над 3000+ научни разработки за продажба" icon={InventoryIcon} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Achievements;