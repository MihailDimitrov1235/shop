import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, CardMedia } from '@mui/material';

const RequestPage = () =>{

    const { t, i18n } = useTranslation();

    const cardSx = {
        textAlign:'center',
        width:'30%',
    }

    const headingSx = {
        position:'absolute',
        bottom:'5%',
        left: '5%',
        color:'#f0f0f0',
    }

    const imageSx = {
        width:'100%',
        aspectRatio: '1/1',
        position: 'relative',
    }

    const frontSx = {
        width:'100%',
        height:'100%',
        position:'absolute',
        background: 'linear-gradient(0deg, rgba(198,0,0,0.8) 0%, rgba(176,33,0,0.35) 89%)'
    }

    const backSx = {
        width:'100%',
        height:'100%',
    }

    return(
        <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
            <Card border={'solid yellow 1px'} sx={cardSx}>
                <Box sx={imageSx}>
                    <Box sx = {frontSx}>
                        <Typography variant='h3' sx={headingSx}>{t('authors')}</Typography>
                    </Box>
                    <CardMedia sx={backSx} image='https://ec.europa.eu/eurostat/documents/4187653/15537732/Gorodenkoff_shutterstock_1922200124_RV.jpg'>
                    </CardMedia>
                </Box>
            </Card>
            <Card border={'solid yellow 1px'} sx={cardSx}>
                <Typography variant='h3' sx={headingSx}>{t('products')}</Typography>
                <Box sx={imageSx}>

                </Box>
            </Card>
        </Box>
    )
}

export default RequestPage