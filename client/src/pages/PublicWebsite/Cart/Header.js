import { Box, Card, Grid, Typography } from '@mui/material';

function Header(){
    return(
        <Card style={{
            marginTop:'20px',
        }}>
            <Grid container>
                <Grid item xs={5}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Items</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Price</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Parts</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='h6' style={{ textAlign: 'center'}}>Total</Typography>
                </Grid>
            </Grid>
        </Card>
    )
};

export default Header;