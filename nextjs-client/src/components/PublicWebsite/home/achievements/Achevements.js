import React from 'react';
import { Box, Typography, Button, CardMedia, Card, Grid, Container } from '@mui/material';
import Achievement from './Achievement';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useTranslation } from 'react-i18next';

function Achievements() {

    const { t } = useTranslation();

    return (
        <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto' }}>
            <Box sx={{ my: '100px' }}>
                <Typography
                    variant='h1'
                    sx={{
                        textAlign: 'center',
                        position: 'relative',
                        ':after': {
                            content: '""',
                            position: 'absolute',
                            width: '20%',
                            height: '3px',
                            bottom: '-10px',
                            left: '40%',
                            borderBottom: '3px dashed',
                            borderColor: 'background.bordoRed'
                        }
                    }}
                >
                    {t('achievements')}
                </Typography>
                <Grid
                    container
                    spacing={4}
                    columnSpacing={{ md: 20, lg: 40 }}
                    justifyContent='space-between'
                    sx={{ mt: 5 }}
                >
                    <Grid item md={12}>
                        <Achievement title="Stay Ahead of the Curve: Access the Latest Scientific Papers and Research" desc="Gain a competitive edge by accessing the most current scientific papers and research. Our platform offers a comprehensive collection of groundbreaking studies across various disciplines. Stay informed, explore emerging trends, and leverage the power of knowledge to drive innovation within your company" reverse={false} image='https://www.audemarspiguet.com/etc.clientlibs/ap-com/ui/clientlibs/calibre-1000/resources/images/design/Watch_Variation_06_qggoom_c_scale,w_1977.webp'/>
                    </Grid>
                    <Grid item md={12}>
                        <Achievement title="Products" desc="Имаме над 3000+ научни разработки за продажба" reverse={true} image='https://www.audemarspiguet.com/etc.clientlibs/ap-com/ui/clientlibs/calibre-1000/resources/images/design/Watch_Variation_06_qggoom_c_scale,w_1977.webp' />
                    </Grid>
                    <Grid item md={12}>
                        <Achievement title="Products" desc="Имаме над 3000+ научни разработки за продажба" reverse={false} image='https://www.audemarspiguet.com/etc.clientlibs/ap-com/ui/clientlibs/calibre-1000/resources/images/design/Watch_Variation_06_qggoom_c_scale,w_1977.webp' />
                    </Grid>
                    <Grid item md={12}>
                        <Achievement title="Products" desc="Имаме над 3000+ научни разработки за продажба" reverse={true} image='https://www.audemarspiguet.com/etc.clientlibs/ap-com/ui/clientlibs/calibre-1000/resources/images/design/Watch_Variation_06_qggoom_c_scale,w_1977.webp' />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Achievements;