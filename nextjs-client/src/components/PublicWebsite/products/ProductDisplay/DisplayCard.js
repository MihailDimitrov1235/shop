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
import Link from 'next/link';
import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useTranslation } from 'next-i18next';

function DisplayCard({ product }) {
    const { t } = useTranslation();
    const [{ transform }, api] = useSpring(() => ({
        transform: 'scale(1)',

    }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({ transform: hovering ? 'scale(1.1)' : 'scale(1)' }),
    })

    const {
        id,
        name = '',
        shortDescription = '',
        files = [{ path: 'https://files.porsche.com/filestore/image/multimedia/none/carrange-flyout-911/small/3cf76e8c-6694-11e9-80c4-005056bbdc38;sQ;twebp;c1696;gc/porsche-small.webp' }]
    } = product;

    return (
        <animated.div {...bind()} style={{ transform }}>
            <Card sx={{ height: '330px', marginLeft: 'auto', marginRight: 'auto' }}>
                <CardActionArea component={Link} href={`/products/${id}`} >
                    <CardMedia
                        component='img'
                        alt={name}
                        height='150'
                        image={`${process.env.REACT_APP_ASSETS}/${files[0].path}`}
                    />
                </CardActionArea>
                <CardContent sx={{ height: '100px', overflow: 'hidden' }}>
                    <Typography gutterBottom variant='h5' component='div'>
                        {name}
                    </Typography>
                    <Tooltip title={shortDescription}>
                        <Typography variant='body2' color='text.secondary'>
                            <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
                        </Typography>
                    </Tooltip>
                </CardContent>
                <CardActions>
                    <Button variant='contained' color='bordoRed' component={Link} href={`/products/${id}`} style={{
                        width: 'auto',
                        fontSize: "12px",
                        marginTop: '30px',
                    }}>
                        {t('more-details')}
                    </Button>
                </CardActions>
            </Card>
        </animated.div>
    )
}

export default DisplayCard;