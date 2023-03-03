import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Link, useParams } from 'react-router-dom';
import { FormControl, MenuItem, InputLabel, Select, Box, Button, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import productService from '../../../services/product';
import { useTranslation } from 'react-i18next';
import ProductDisplay from '../../../components/PublicWebsite/products/ProductDisplay';

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
    const { t } = useTranslation();

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
        <>
            <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 5, }}>
                <Card elevation={1} sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex' }}>
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
                            <Box border='solid purple 1px' sx={{ display: 'flex', width: '100%', height: '100%' }}>
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
                <Card elevation={1} sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography
                            variant='h3'
                            sx={{
                                textAlign: 'center',
                                position: 'relative',
                                ':after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '10%',
                                    height: '3px',
                                    bottom: '-10px',
                                    left: '45%',
                                    borderBottom: '3px dashed',
                                    borderColor: 'background.bordoRed'
                                }
                            }}
                        >
                            {t('description')}
                        </Typography>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant='p'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget maximus tortor, vitae varius tellus. Morbi nec nisl et eros tempus porttitor. Phasellus mattis leo ligula, sed vehicula quam lacinia et. Ut sagittis nunc in lorem euismod faucibus. Vestibulum at lectus vel risus eleifend tristique. Vestibulum eu interdum mauris. Duis diam arcu, laoreet quis ullamcorper a, elementum sed leo. Morbi interdum mi vitae ex pellentesque cursus. Suspendisse potenti. Sed et elit pharetra, dignissim sapien id, iaculis nulla. Donec in ligula nisi. Vivamus nisl lacus, fermentum at blandit quis, condimentum vitae neque. Mauris elementum, metus a rhoncus rutrum, justo purus faucibus ligula, quis fringilla sem velit sed neque. Aliquam erat volutpat. Ut mollis dolor eros.

                                Mauris eget consequat mauris. Duis sed placerat libero. Sed ante ante, condimentum dignissim molestie rhoncus, dictum eget lacus. In ut lobortis augue. Aliquam tempus, ex vitae laoreet imperdiet, magna lorem venenatis augue, ac scelerisque orci nisi a ante. Fusce molestie, risus ac dictum semper, arcu ante convallis velit, aliquet faucibus enim enim id magna. Ut ullamcorper ipsum in est viverra rhoncus. Donec ac erat condimentum, porta dolor at, aliquam mauris. Donec euismod enim consectetur arcu mattis consectetur. Donec porttitor semper sollicitudin. Curabitur a sagittis erat. Sed et tellus ipsum. Ut pulvinar malesuada mauris et porttitor. In consectetur massa eget leo iaculis fringilla. Aliquam id sollicitudin lacus, nec gravida massa. In placerat eros in orci convallis aliquam.

                                Suspendisse potenti. Phasellus congue sed velit ut aliquam. Duis dignissim suscipit quam non condimentum. Aenean lacus odio, rutrum quis tortor sed, consectetur cursus leo. Sed eu blandit nunc, non tempus tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet quam aliquam consequat tempus. Nullam hendrerit dictum purus id ultricies. Praesent cursus pulvinar purus, quis pulvinar lacus consectetur sed. Fusce at fringilla ex. Vivamus egestas tempus urna eu consequat. Suspendisse efficitur sem eget volutpat hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus aliquam vehicula massa eu pretium.

                                Quisque ut fermentum odio, sit amet tristique urna. Phasellus tincidunt velit sem, et vehicula turpis volutpat eget. Aliquam porta ac tortor a bibendum. Curabitur fermentum cursus massa, vel egestas dui tincidunt vel. Nam sit amet euismod turpis, ac volutpat nunc. Nullam elementum aliquam elit ut consequat. Cras pulvinar orci sed lacus tristique, at finibus eros ullamcorper. Mauris at neque vitae nisi vulputate pharetra eu vitae nibh. Praesent mattis odio in aliquet laoreet. Vivamus odio nunc, efficitur vel mauris in, tristique auctor nunc. Nam lorem est, viverra pretium fermentum in, pharetra sed nisi. Curabitur nec tincidunt libero.

                                Nam sem purus, ultricies sed mollis ut, ullamcorper eu ex. Proin at nulla purus. Vestibulum ut eros sed massa fermentum placerat sed et massa. Praesent in posuere ipsum, ut sodales tellus. Vestibulum a eleifend risus. Nunc non justo quis nisi pulvinar viverra id sed velit. Suspendisse sed ex erat. Nullam nibh diam, pharetra eu felis in, vulputate tempor tortor. Pellentesque eu dolor at sapien rutrum pharetra. Sed efficitur massa quis orci consequat, non sagittis eros finibus. Donec mattis consequat facilisis.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 5, position: 'relative' }}>
                <Typography
                    variant='h3'
                    sx={{
                        textAlign: 'center',
                        position: 'relative',
                        mb: 2,
                        ':after': {
                            content: '""',
                            position: 'absolute',
                            width: '10%',
                            height: '3px',
                            bottom: '-10px',
                            left: '45%',
                            borderBottom: '3px dashed',
                            borderColor: 'background.bordoRed'
                        }
                    }}
                >
                    {t('simular-products')}
                </Typography>
                <ProductDisplay />
            </Container>
        </>
    );
}

export default ProductPage;