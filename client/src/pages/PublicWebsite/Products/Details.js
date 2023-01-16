import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Link, useParams } from 'react-router-dom';
import { FormControl, MenuItem, InputLabel, Select, Box, Button, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import productService from '../../../services/product';

const useStyles = makeStyles({
    image: {
        maxWidth: '50%',
        width: 'auto',
        height: '75vh',
        borderRadius: '0 0 35px 35px'
    },
    text: {
        flexGrow: 1
    },
    button: {
        padding: '10px',
    }
});

const ProductPage = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [part, setPart] = useState('');
    const [price, setPrice] = useState('');
    const [product, setProduct] = useState({});

    useEffect(() => {
        productService.getProductById(id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleChange = (event) => {
        product.parts.forEach(part => {
            if (part.id === event.target.value) {
                setPrice(part.price);
            }
        });
        setPart(event.target.value);
    };

    return (
        <Container maxWidth={'false'} sx={{
            px: { lg: '130px!important' }
        }}>
            <Card elevation={0}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10,
                    px: 3
                }}>
                    <CardMedia
                        className={classes.image}
                        component='img'
                        title={product.name}
                        image={product.files && `${process.env.REACT_APP_ASSETS}/${product.files[0].path}`}
                    />
                    <CardContent className={classes.text}>
                        <Typography gutterBottom variant='h3' component='h2'>
                            {product.name}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {product.longDescription}
                        </Typography>
                        <Box display={'flex'} marginTop={'30px'}>
                            <Button className={classes.button} variant='contained' color='bordoRed' component={Link} to='/products'>
                                Buy
                            </Button>
                            <FormControl fullWidth>
                                <InputLabel id='part' color='bordoRed'>Part</InputLabel>
                                <Select
                                    labelId='part'
                                    id='part'
                                    value={part}
                                    label='Part'
                                    color='bordoRed'
                                    onChange={handleChange}
                                >
                                    {product.parts && product.parts.map(part => {
                                        return (
                                            <MenuItem value={part.id}>{part.id}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {price} лв.
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Container>
    );
}

export default ProductPage;