import { Box, Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

function Header(){
    const { t } = useTranslation();
    return(
        <Card sx={{
            marginTop:'20px',
            display:{md:'flex', xs:'none'}
        }}>
            <Grid container>
                <Grid item md={6}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>{t('item')}</Typography>
                </Grid>
                <Grid item md={4}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>{t('parts')}</Typography>
                </Grid>
                <Grid item md={2}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>{t('total-price')}</Typography>
                </Grid>
            </Grid>
        </Card>
    )
};

export default Header;