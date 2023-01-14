import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material';



const CartItem = ({ item }) => {
  return (
      <Card style={{marginBottom:'20px', width:'100%'}}>
        {/* <Box display = 'flex'
        justifyContent = 'space-between'
        fontFamily = 'Arial, Helvetica, sans-serif'
        height='170px'
        >
        <h3>{item.title}</h3>
        <div style={{flex: '1'}}>
          <p>Price: ${item.price}</p>
          {/* <p>Total: ${(item.amount * item.price).toFixed(2)}</p> */}
        {/* </div>
        <div style={{flex: '1'}}>
          <Button
            size="small"
            disableElevation
            variant="contained"
            // onClick={() => removeFromCart(item.id)}
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
          >
            -
          </Button>
          <Button
            size="small"
            disableElevation
            variant="contained"
            // onClick={() => addToCart(item)}
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
          >
            +
          </Button>
        </div>
        <CardMedia src={item.image} alt={item.title} component='img' style={{
            width: 'auto',
            height:'100%',
            objectFit: 'cover',
            marginLeft: '40px',
        }} />
        </Box> */}
        <Grid container>
            <Grid xs={6}>
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
        </Grid>
      </Card>
  );
};

export default CartItem;