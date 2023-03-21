import { Box, IconButton, Card, CardMedia, Grid, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';



const CartItem = ({ item, removeFromCart }) => {
  return (
      <Card style={{marginTop:'20px', width:'100%'}}>
        <Grid container>
            <Grid item xs={5}>
                <Box display={'flex'}>
                    <CardMedia src={item.image} alt={item.title} component='img' style={{
                        width: 'auto',
                        height:'150px',
                        objectFit: 'cover',
                    }} /> 
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center'
                }}>
                    <Typography variant='h3' >{item.title}</Typography>
                    <Typography variant='h6' >{item.description}</Typography>
                </Box>
                </Box>
            </Grid>
            <Grid item xs={2} sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}>
                <Typography variant='h6' style={{ textAlign: 'center', justifyContent:'center'}}>Price</Typography>
            </Grid>
            <Grid item xs={2} sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}>
                <Typography variant='h6' style={{ textAlign: 'center'}}>Parts</Typography>
            </Grid>
            <Grid item xs={2} sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}>
                <Typography variant='h6' style={{ textAlign: 'center'}}>Total</Typography>
            </Grid>
            <Grid item xs={1} textAlign='right'>
                <IconButton onClick={() => removeFromCart(item.id)}>
                    <CancelIcon/>
                </IconButton>
            </Grid>
        </Grid>
      </Card>
  );
};

export default CartItem;