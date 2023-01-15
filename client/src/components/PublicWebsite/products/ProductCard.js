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

const ProductCard = ({ id, title="Lizard", subtitle="", img="https://files.porsche.com/filestore/image/multimedia/none/carrange-flyout-911/small/3cf76e8c-6694-11e9-80c4-005056bbdc38;sQ;twebp;c1696;gc/porsche-small.webp"}) => {
    return (
        <Card sx={{ maxWidth: 250, height:'330px'}}>
            <CardActionArea component={Link} to={`/product/${id}`} >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="150"
                    image={img}
                />
            </CardActionArea>
            <CardContent sx={{ height:'100px', overflow:'hidden'}}>
                <Tooltip title={title}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </Tooltip>
                <Tooltip title={subtitle}>
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Tooltip>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="bordoRed" component={Link} to={`/product/${id}`} style={{
                    width:"auto",
                    fontSize:"12px",
                    marginTop: '30px',
                }}>More details</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;