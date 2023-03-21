import { Box, IconButton, Card, CardMedia, Grid, Typography, Table, TableHead, TableBody, TableCell,TableRow } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';



const CartItem = ({ item, removeFromCart }) => {
    let total = 0;
    item.parts.forEach(part => {
        total += part.price;
    });
  return (
      <Card style={{marginTop:'20px', width:'100%'}}>
        <Grid container sx={{
            position:'relative'
        }}>
            <Grid item md={6} xs={12} sx={{
                position:'relative',
            }}>
                <Box display={'flex'} width='100%' height={'100%'} sx={{
                    position: {md: 'absolute', xs: 'relative'}
                }}>
                    <Box height={'100%'} overflow='hidden' >
                    <CardMedia src={item.image} alt={item.title} component='img' style={{
                        height:'100%',
                        objectFit: 'cover',
                    }} /> 
                    </Box>
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
            <Grid item md={4} xs={8} sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                py:{md:0,xs:1},
            }}>
                <Table>
                    <TableBody>
                        {item.parts.map(part =>(
                            <TableRow sx={{
                                borderBottom: "none",
                            }}>
                                <TableCell sx={{
                                    borderBottom: "none",
                                }}>
                                    <Typography>{part.id}</Typography>
                                </TableCell>
                                <TableCell sx={{
                                    borderBottom: "none",
                                }}> 
                                    <Typography>{part.name}</Typography>
                                </TableCell>
                                <TableCell sx={{
                                    borderBottom: "none",
                                }}>
                                    <Typography>{part.price} лв.</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item md={2} xs={4} sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                py:{md:0,xs:1},
            }}>
                <Typography variant='h4' style={{ textAlign: 'center'}}>Total: {total}</Typography>
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