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
        <Box display='flex' width='80%' marginLeft='auto' marginRight='auto'>
            <Card elevation={1} style={{
                width:'100%'
            }}>
                <Box display='flex'>
                    <Box width='30%'>
                        <CardMedia
                            component="img"
                            alt='img'
                            image='https://files.porsche.com/filestore/image/multimedia/none/carrange-flyout-911/small/3cf76e8c-6694-11e9-80c4-005056bbdc38;sQ;twebp;c1696;gc/porsche-small.webp'
                        />
                    </Box>
                    <Box width='70%'>
                        <Box width='100%' height='100px' textAlign='center'>
                            <Typography variant='h2'>Product of the bulgarian academy of sciences</Typography>
                        </Box>
                        <Box width='100%' height = '100%' border='solid purple 1px' display='flex'>
                            <Box width='60%' border='solid 1px red'>
                                <Box height='20%' border='solid 2px blue' justifyContent='center' alignContent='center' textAlign='center'>
                                    <Typography variant='p'>authors</Typography>
                                </Box>
                                <Box height='80%' border='solid 2px purple'>
                                </Box>
                            </Box>
                            <Box width='40%' border='solid 2px blue'>

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}

export default ProductPage;