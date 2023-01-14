import { Box, Card, Grid, Typography } from '@mui/material';

function Header(){
    return(
        <Card>
            <Grid container>
                <Grid xs={6}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Items</Typography>
                </Grid>
                <Grid xs={2}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Price</Typography>
                </Grid>
                <Grid xs={2}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Parts</Typography>
                </Grid>
                <Grid xs={2}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Total</Typography>
                </Grid>
            </Grid>
        </Card>
    )
};

export default Header;