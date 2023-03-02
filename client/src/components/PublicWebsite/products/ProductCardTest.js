import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardActionArea,
    Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

function ProductCardTest(){

    const [{transform}, api] = useSpring( () => ({
        transform: "scale(1)",

      }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({transform:hovering? 'scale(1.1)': 'scale(1)'}),
})

    const name = "Lizard";
    const shortDescription = "fsdhiuwefhiow ehfoi weuifhwiue";
    const id = 1;
    return(
        <animated.div {...bind()} style={{transform}}>
            <Card sx={{ height: '330px', marginLeft: 'auto', marginRight: 'auto' }}>
                <CardActionArea component={Link} to={`/product/${id}`} >
                    <CardMedia
                        component="img"
                        alt={name}
                        height="150"
                        image='https://files.porsche.com/filestore/image/multimedia/none/carrange-flyout-911/small/3cf76e8c-6694-11e9-80c4-005056bbdc38;sQ;twebp;c1696;gc/porsche-small.webp'
                    />
                </CardActionArea>
                <CardContent sx={{ height: '100px', overflow: 'hidden' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Tooltip title={shortDescription}>
                        <Typography variant="body2" color="text.secondary">
                            {shortDescription}
                        </Typography>
                    </Tooltip>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="bordoRed" component={Link} to={`/product/${id}`} style={{
                        width: "auto",
                        fontSize: "12px",
                        marginTop: '30px',
                    }}>More details</Button>
                </CardActions>
            </Card>
        </animated.div>
    )
}

export default ProductCardTest;