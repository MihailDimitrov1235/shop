import { Box, IconButton, Card, CardMedia, Grid, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';



const CartItem = ({ item, removeFromCart }) => {
  console.log(item.id)
  return (
      <Card style={{marginTop:'20px', width:'100%'}}>
        <Grid container>
            <Grid xs={5}>
                <Box display={'flex'}>
                    <CardMedia src={item.image} alt={item.title} component='img' style={{
                        width: 'auto',
                        height:'150px',
                        objectFit: 'cover',
                    }} /> 
                <Box>
                    <Typography variant='h3' >{item.title}</Typography>
                    <Typography variant='h6' >{item.description}</Typography>
                </Box>
                </Box>
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
            <Grid xs={1} textAlign='right'>
                <IconButton onClick={() => removeFromCart(item.id)}>
                    <CancelIcon/>
                </IconButton>
            </Grid>
        </Grid>
      </Card>
  );
};

export default CartItem;