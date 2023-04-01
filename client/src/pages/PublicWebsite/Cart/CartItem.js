import { useState, useEffect } from 'react';
import { Box, IconButton, Card, CardMedia, Grid, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';

const CartItem = ({ item, removeFromCart }) => {
    const [total, setTotal] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        if (item) {
            let sum = 0;

            item.parts.forEach(part => {
                sum += part.price;
            })

            setTotal(sum);
        }
    }, [item])

    return (
        <Card style={{ marginTop: '20px', width: '100%' }}>
            <Grid container sx={{
                position: 'relative'
            }}>
                <Grid item md={6} xs={12} sx={{
                    position: 'relative',
                }}>
                    <Box display={'flex'} width='100%' height={'100%'} sx={{
                        position: { md: 'absolute', xs: 'relative' }
                    }}>
                        <Box height={'100%'} overflow='hidden' >
                            <CardMedia src={`${process.env.REACT_APP_ASSETS}/${item.image}`} alt={item.title} component='img' style={{
                                height: '100%',
                                objectFit: 'cover',
                            }} />
                        </Box>
                        <Box sx={{
                            width: '100%',
                            px: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: { md: 'left', xs: 'center' }
                        }}>
                            <Typography variant='h3' >{item.title}</Typography>
                            <Typography variant='subtitle1' >{item.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={4} xs={8} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: { md: 0, xs: 1 },
                    my: { md: 1, xs: 0 },
                    borderLeft: { md: 'solid 2px rgba(224, 224, 224, 1)', xs: 'none' },
                    borderRight: { md: 'solid 2px rgba(224, 224, 224, 1)', xs: 'none' },
                }}>
                    <Table>
                        <TableBody>
                            {item.parts.map((part, index) => (
                                <TableRow
                                    sx={{ borderBottom: "none" }}
                                    key={index}
                                >
                                    {/* <TableCell sx={{
                                    borderBottom: "none",
                                }}>
                                    <Typography>{part.id}</Typography>
                                </TableCell> */}
                                    {/* <TableCell sx={{
                                        textAlign: 'center',
                                        borderBottom: "none",
                                    }}>
                                        <Typography variant='subtitle1'>{part.name}</Typography>
                                    </TableCell> */}
                                    <TableCell sx={{
                                        textAlign: 'center',
                                        borderBottom: "none",
                                    }}>
                                        <Typography variant='h6'>{part.price} {t('bgn')}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item md={2} xs={4} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: { md: 0, xs: 1 },
                }}>
                    <Typography variant='h5' style={{ textAlign: 'center' }}>{t('total')}: {total} {t('bgn')}</Typography>
                </Grid>
                <Grid item textAlign='right' sx={{
                    position: 'absolute',
                    right: '0'
                }}>
                    <IconButton onClick={() => removeFromCart(item.id)}>
                        <CancelIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Card>
    );
};

export default CartItem;