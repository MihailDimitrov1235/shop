import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Card, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Container } from '@mui/system';
import CartItem from './CartItem';
import Header from './Header';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import cartService from '../../../services/cart';
import paymentService from '../../../services/payment';
import useMessage from '../../../hooks/useMessage';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

function Cart() {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const { addMessage } = useMessage();
    const [products, setProducts] = useState([]);
    const [subTotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            loadCart();
        }
    }, [user, i18n.language]);

    useEffect(() => {
        let sum = 0;

        products.forEach(item => {
            item.parts.forEach(part => {
                sum += part.price;
            });
        });

        setSubtotal(sum);
        setTax(sum / 10);
    }, [products]);

    const loadCart = () => {
        cartService.getCart(user.id, i18n.language)
            .then((res) => {
                console.log(res.data.products);
                setProducts(res.data.products)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const removeFromCart = (id) => {
        cartService.removeProduct(id)
            .then((res) => {
                addMessage(t('removed-from-cart'), 'success');
                loadCart();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handlePlan = async (planId = 1) => {
        setLoading(true);
        const res = await paymentService.checkout(1);
        if (res.status === 200) {
            setLoading(false);
            window.location.replace(res.data.url);
        }
    };

    const [{ x, y }, api] = useSpring(() => ({
        x: "0",
        y: "0",
    }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({ x: hovering ? '-5px' : '0', y: hovering ? '-5px' : '0' }),
    })

    

    return (
        <Container maxWidth={'false'} sx={{
            px: { lg: '130px!important' }
        }}>
            <Box fontFamily={'Arial, Helvetica, sans-serif'}
                width='100%'
                padding='20px'
            >
                {products.length > 0 ? (
                    <>
                        <Typography variant='h2' style={{ textAlign: 'center' }}>{t('your-cart')}</Typography>
                        <Header />
                        {products.map((item, index) => (
                            <CartItem
                                key={index}
                                item={item}
                                removeFromCart={removeFromCart}
                            />
                        ))}
                        <Box width={'400px'} marginLeft={'auto'}>
                            <Card style={{
                                marginTop: '20px',
                                marginBottom: '20px',
                                padding: '20px',
                            }}>
                                <Box justifyContent='space-between' >
                                    <Typography variant='h6' >
                                        {t('subtotal')}: {subTotal} {t("bgn")}
                                    </Typography>
                                </Box>
                                <Box justifyContent='space-between' >
                                    <Typography variant='p'>
                                        {t('taxes')}: {tax} {t("bgn")}
                                    </Typography>
                                </Box>
                                <Box justifyContent='space-between' >
                                    <Typography variant='h4' >
                                        {t("grandtotal")}: {subTotal + tax} {t("bgn")}
                                    </Typography>
                                </Box>
                            </Card>
                            <Box sx={{ textAlign: 'end' }}>
                                <LoadingButton
                                    color='bordoRed'
                                    variant='contained'
                                    onClick={handlePlan}
                                    loading={loading}
                                >
                                    {t('checkout')}
                                </LoadingButton>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ textAlign: 'center', my: 8 }}>

                        <svg width={0} height={0}>
                            <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                                <stop offset={0} stopColor="rgba(219,18,41,1)" />
                                <stop offset={1} stopColor="rgba(150,1,28,1)" />
                            </linearGradient>
                        </svg>
                        <ProductionQuantityLimitsIcon sx={{ fontSize: '180px', fill: "url(#linearColors)" }} />

                        <Box sx={{ my: 6 }}>
                            <Typography variant='h2' style={{ textAlign: 'center' }}>{t('your-cart-is-empty')}</Typography>
                            <Typography variant='p'>{t('empty-cart-message')}</Typography>
                        </Box>
                        <animated.div style={{ x: x, y: y, textAlign:'center', width:'fit-content', margin:'0 auto'}}>
                            <Button
                                {...bind()}
                                variant='contained'
                                color='bordoRed'
                                startIcon={<ShoppingBagIcon />}
                                component={RouterLink}
                                to='/products'
                            >
                                {t('return-to-shop')}
                            </Button>
                        </animated.div>
                    </Box>
                )}

            </Box>
        </Container>
    );
}

export default Cart;