import { Box, Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Header(){
    const { t } = useTranslation();
    return(
        <Card sx={{
            marginTop:'20px',
            display:{md:'flex', xs:'none'}
        }}>
            <Grid container>
                <Grid item md={6}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Item</Typography>
                </Grid>
                <Grid item md={4}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Parts</Typography>
                </Grid>
                <Grid item md={2}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Total Price</Typography>
                </Grid>
            </Grid>
        </Card>
    )
};

export default Header;