import { Box, Typography, Card, Button, Link, CardActions } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Container } from '@mui/system';
import CartItem from './CartItem';
import Header from './Header';
const items = [
    {
        id: 1,
        title: "Knifsy",
        description: "This is a high-quality knife with a wood handle and a sharp blade.",
        parts: [
            { id: 1, price: 999 },
            { id: 2, price: 990 }
        ],
        price: 999,
        image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
    },
    {
        id: 2,
        title: "Knifsy",
        description: "This is a high-quality knife with a wood handle and a sharp blade.",
        parts: [
            { id: 1, price: 999 },
            { id: 2, price: 990 }
        ],
        image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
    },
    {
        id: 3,
        title: "Knifsy",
        description: "This is a high-quality knife with a wood handle and a sharp blade.",
        parts: [
            { id: 1, price: 999 },
            { id: 2, price: 990 }
        ],
        image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
    },
    {
        id: 4,
        title: "Knifsy",
        description: "This is a high-quality knife with a wood handle and a sharp blade.",
        parts: [
            { id: 1, price: 999 },
            { id: 2, price: 990 }
        ],
        image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
    }

];

const removeFromCart = (id) => {
    console.log(id);
};
const subTotal = 0;
const tax = subTotal / 10;
const grandTotal = subTotal + tax;

function Cart() {
    return (
        <Container maxWidth={'false'} sx={{
            px: { lg: '130px!important' }
        }}>
            <Box fontFamily={'Arial, Helvetica, sans-serif'}
                width='100%'
                padding='20px'
            >
                <Typography variant='h2' style={{ textAlign: 'center' }}>Your Cart</Typography>
                <Header />
                {items.length === 0 ? <p>No items in cart.</p> : null}
                {items.map((item) => (
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
                            <Typography variant='h3' >
                                Subtotal: {subTotal} lv.
                            </Typography>
                        </Box>
                        <Box justifyContent='space-between' >
                            <Typography variant='p'>
                                Taxes: {tax} lv.
                            </Typography>
                        </Box>
                        <Box justifyContent='space-between' >
                            <Typography variant='h6' >
                                GrandTotal: {grandTotal} lv.
                            </Typography>
                        </Box>
                    </Card>
                    <Box justifyContent='right' display='flex'>
                        <Button variant="contained" color="bordoRed" component={RouterLink} to='/payments'>
                            Complete order
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Cart;