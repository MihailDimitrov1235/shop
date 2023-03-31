import { Box, Typography, Card, Button, Link, CardActions } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Container } from '@mui/system';
import CartItem from './CartItem';
import Header from './Header';
import { useTranslation } from 'react-i18next';
const props = [
    {
        id: 1,
        title: "Knifsy",
        description: "This is a high-quality knife with a wood handle and a sharp blade.",
        parts: [
            { id: 1, price: 999, name: 'introduction' },
            { id: 2, price: 990, name: 'part2' }
        ],
        image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
    },
    {
        id: 2,
        title: "Knifsy",
        description: "This is a high-quality knife with a wood handle and a sharp blade.",
        parts: [
            { id: 1, price: 999, name: 'introduction' },
            { id: 2, price: 990, name: 'part2' }
        ],
        image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
    },
    {
        id: 3,
        title: "Knifsy",
        description: "This is a high-quality knife with a wood handle and a sharp blade.",
        parts: [
            { id: 1, price: 999, name: 'introduction' },
            { id: 2, price: 990, name: 'part2' }
        ],
        image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
    },
    {
        id: 4,
        title: "Knifsy",
        description: "This is a high-quality knife with a wood handle and a sharp blade.",
        parts: [
            { id: 1, price: 999, name: 'introduction' },
            { id: 2, price: 990, name: 'part2' }
        ],
        image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
    }

];

const removeFromCart = (id) => {
    console.log(id);
};
let subTotal = 0;
props.forEach(item => {
    item.parts.forEach(part => {
        subTotal += part.price;
    });
});
const tax = subTotal / 10;
const grandTotal = subTotal + tax;

function Cart() {
    const { t } = useTranslation();
    return (
        <Container maxWidth={'false'} sx={{
            px: { lg: '130px!important' }
        }}>
            <Box fontFamily={'Arial, Helvetica, sans-serif'}
                width='100%'
                padding='20px'
            >
                <Typography variant='h2' style={{ textAlign: 'center' }}>{t('your-cart')}</Typography>
                <Header />
                {props.length === 0 ? <p>{t('no-items-in-cart')}</p> : null}
                {props.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        // addToCart={addToCart}
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
                                {t("grandtotal")}: {grandTotal} {t("bgn")}
                            </Typography>
                        </Box>
                    </Card>
                    <Box justifyContent='right' display='flex'>
                        <form action="/api/checkout" method="POST">
                            <input type ="hidden" name="_token" value="{{csrf_token()}}"/>
                            <button type="submit">{t("checkout")}.</button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Cart;