import {
    Box,
    Typography
} from '@mui/material';
import topSvg from './Vector.svg';

const Footer = () => {
    return (
        <footer style={{ marginTop: '50px' }}>
            <Box sx={{ display: 'flex' }}>
                <img style={{ width: '100%' }} src={topSvg} alt="curve" />
            </Box>
      
            <Box width="100%" bgcolor={"#96011c"} display={'flex'} paddingBottom='40px'>
                <Box width={'50%'} alignItems={'center'} justifyContent='center' color={'white'} textAlign='center'>
                    <Box width={'300px'} marginLeft='auto' marginRight={'auto'}>
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

                <Box width={'50%'} alignItems={'center'} justifyContent='center' color={'white'} textAlign='center'>
                    <Box width={'400px'} marginLeft='auto' marginRight={'auto'}>
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

            <Box width="100%" bgcolor={"#96011c"} display={'flex'}>
                <Box width={'70%'} display="flex" alignItems={'center'} justifyContent='center'>
                    <Typography color={'white'}>© 2023 Българска академия на науките | Някои права запазени | Политика за бисквитките</Typography>
                </Box>
                <Box width={'30%'} display="flex" justifyContent={'space-evenly'} padding={'10px'}>
                    <img src="/static/images/icons/FacebookIcon.png" height={'30px'} />
                    <img src="/static/images/icons/TwitterIcon.png" height={'30px'} />
                    <img src="/static/images/icons/InstagramIcon.png" height={'30px'} />
                    <img src="/static/images/icons/YoutubeIcon.png" height={'30px'} />
                </Box>
            </Box>
        </footer>
    );
}

export default Footer;