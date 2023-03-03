import {
    Box,
    Typography
} from '@mui/material';
import { Container } from '@mui/system';
import { useTranslation } from 'react-i18next';

const InformationSection = () => {
    const { t } = useTranslation();
    return (
        <>
            <img style={{ width: '100%' }} src='/static/images/Top.svg' alt="curve" />

            <Box bgcolor={"#96011c"}>
                <Container
                    maxWidth={'false'}
                    sx={{
                        width: '85%',
                        margin: '0 auto',
                        py: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <Box sx={{ textAlign: 'center', width: { md: '40%' } }}>
                        <Typography
                            variant='h1'
                            sx={{
                                fontSize: '35px',
                                color: 'white',
                                fontWeight: 800,
                                position: 'relative',
                                ':after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '70%',
                                    height: '3px',
                                    bottom: '-10px',
                                    left: '15%',
                                    borderBottom: '3px dashed',
                                    borderColor: 'white'
                                }
                            }}
                        >
                            {t('information-title')}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{ fontSize: '19px', color: 'white', fontWeight: 800, mt: '100px' }}
                        >
                            {t('information-desc')}
                        </Typography>
                    </Box>

                    <img src='/static/images/glass.png' width='518' />
                </Container>
            </Box>

            <img style={{ width: '100%' }} src='/static/images/Bottom.svg' alt="curve" />
        </>
    );
}

export default InformationSection;