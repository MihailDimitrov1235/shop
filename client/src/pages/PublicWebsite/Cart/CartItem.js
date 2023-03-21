import { Box, IconButton, Card, CardMedia, Grid, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';



const CartItem = ({ item, removeFromCart }) => {
  return (
      <Card style={{marginTop:'20px', width:'100%'}}>
        <Grid container sx={{
            position:'relative'
        }}>
            <Grid item md={6} xs={12}>
                <Box display={'flex'} width='100%'>
                    <CardMedia src={item.image} alt={item.title} component='img' style={{
                        width: 'auto',
                        height:'150px',
                        objectFit: 'cover',
                    }} /> 
                    <Box sx={{
                        width:'100%',
                        px:1,
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        textAlign:{md:'left',xs:'center'}
                    }}>
                        <Typography variant='h3' >{item.title}</Typography>
                        <Typography variant='h6' >{item.description}</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item md={2} xs={4} sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                py:{md:0,xs:1},
            }}>
                <Typography variant='h6' style={{ textAlign: 'center', justifyContent:'center'}}>Price</Typography>
            </Grid>
            <Grid item md={2} xs={4} sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                py:{md:0,xs:1},
            }}>
                <Typography variant='h6' style={{ textAlign: 'center'}}>Parts</Typography>
            </Grid>
            <Grid item md={2} xs={4} sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                py:{md:0,xs:1},
            }}>
                <Typography variant='h6' style={{ textAlign: 'center'}}>Total</Typography>
            </Grid>
            <Grid item textAlign='right' sx={{
                position:'absolute',
                right:'0'
            }}>
                <IconButton onClick={() => removeFromCart(item.id)}>
                    <CancelIcon/>
                </IconButton>
            </Grid>
        </Grid>
      </Card>
  );
};

export default CartItem;