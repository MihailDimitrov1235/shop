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
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const ProductCard = ({ product }) => {
    const { t } = useTranslation();

    return (
        <Card sx={{ height: '330px', marginLeft: 'auto', marginRight: 'auto' }}>
            <CardActionArea component={Link} href={`/products/${id}`} >
                <CardMedia
                    component="img"
                    alt={name}
                    height="150"
                    image={`${process.env.REACT_APP_ASSETS}/${files[0].path}`}
                />
            </CardActionArea>
            <CardContent sx={{ height: '100px', overflow: 'hidden' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Tooltip title={shortDescription}>
                    <Typography variant="body2" component='div' color="text.secondary">
                        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
                    </Typography>
                </Tooltip>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="bordoRed" component={Link} to={`/products/${id}`} style={{
                    width: "auto",
                    fontSize: "12px",
                    marginTop: '30px',
                }}>
                    {t('more-details')}
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;