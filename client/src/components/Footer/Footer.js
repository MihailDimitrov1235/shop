import {
    Box,
    Container,
    Typography
} from '@mui/material';
import topSvg from './Vector.svg';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer style={{ marginTop: '50px' }}>
            <Box sx={{ display: 'flex' }}>
                <img style={{ width: '100%' }} src={topSvg} alt="curve" />
            </Box>

            <Box sx={{ backgroundColor: 'background.bordoRed' }}>
                <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto' }}>
                    <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            pb: '40px',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: 5
                        }}
                    >
                        <Box sx={{ flexGrow: 1, color: 'white', textAlign: 'center' }}>
                            <Box sx={{ width: '300px', margin: '0 auto' }}>
                                <Typography variant='h3' paddingBottom={'50px'} display='block'>КОНТАКТИ</Typography>
                                <Typography variant='p' display='block'>
                                    София, 1040, ул. „15 ноември“ №1
                                </Typography>
                                <Typography variant='p' display='block'>
                                    (+359 2) 979 53 33
                                </Typography>
                                <Typography variant='p' display='block' paddingBottom={'50px'}>
                                    (+359 2) 979 52 23
                                </Typography>
                                <Typography variant='p'>
                                    Администрация на БАН
                                    Връзки с обществеността
                                    Звена на БАН
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
                            <Box sx={{ width: '400px', margin: '0 auto' }}>
                                <Typography variant='h3' paddingBottom={'20px'} display='block'>КАРИЕРИ</Typography>
                                <Typography variant='p' paddingBottom={'50px'} display='block'>
                                    Обяви и конкурси по ЗРАСРБ
                                    Конкурси за избор на директори на СЗ на БАН
                                    Регистър на присъдените академични длъжности
                                    Регистър на присъдените степени
                                    Докторски програми
                                </Typography>

                                <Typography variant='h3' paddingBottom={'20px'} display='block'>ФИНАНСОВА И СТОПАНСКА ДЕЙНОСТ</Typography>
                                <Typography variant='p' display={'block'}>
                                    Бюджет и финансова информация
                                </Typography>
                                <Typography variant='p' display={'block'}>
                                    Профил на купувача
                                </Typography>
                                <Typography variant='p' display={'block'}>
                                    Имоти под наем
                                </Typography>
                                <Typography variant='p' display={'block'}>
                                    Почивно дело
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography color={'white'}>{t('copyright')}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: '10px', width: '40%' }}>
                            <img src="/static/images/icons/FacebookIcon.png" height={'30px'} />
                            <img src="/static/images/icons/TwitterIcon.png" height={'30px'} />
                            <img src="/static/images/icons/InstagramIcon.png" height={'30px'} />
                            <img src="/static/images/icons/YoutubeIcon.png" height={'30px'} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer;