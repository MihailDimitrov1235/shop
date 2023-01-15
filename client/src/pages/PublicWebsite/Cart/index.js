import { Box, Typography } from '@mui/material';
import CartItem from './CartItem';
import Header from './Header';
const items = [
    {
    id : 1,
    title: "Knifsy",
    description: "This is a high-quality knife with a wood handle and a sharp blade.",
    parts:[
      {id:1, price:999},
      {id:2, price:990}
    ],
    image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
},
  {
    id : 2,
    title: "Knifsy",
    description: "This is a high-quality knife with a wood handle and a sharp blade.",
    parts:[
      {id:1, price:999},
      {id:2, price:990}
    ],
    image: "https://cdn.discordapp.com/attachments/1008571197572775966/1063814791317180526/Knifsy_lab_glass_filled_with_red_stuff_on_white_background_97def308-e59c-40f6-bab1-3b12137430ad.png"
}
];

function Cart (){
    return (
        <Box fontFamily = {'Arial, Helvetica, sans-serif'}
        width = '100%'
        padding = '20px'
        >
        <Typography variant='h2' style={{textAlign:'center'}}>Your Cart</Typography>
        <Header/>
        {items.length === 0 ? <p>No items in cart.</p> : null}
        {items.map((item) => (
            <CartItem
            key={item.id}
            item={item}
            // addToCart={addToCart}
            // removeFromCart={removeFromCart}
            />
        ))}
        {/* <h2>Total: ${calculateTotal(items).toFixed(2)}</h2> */}
        </Box>
    );
}

export default Cart;