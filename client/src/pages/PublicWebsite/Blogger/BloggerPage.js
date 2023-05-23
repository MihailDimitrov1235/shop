import { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, Card, styled } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import Gradient from './bloggerGradient.svg';
import CreatedPosts from './CreatedPosts';

const ContactBox = styled(Box)(() => ({
    display: 'flex',
    margin: '10px auto',
    alignItems: 'center',
    gap: '5px'
}));


const props = {
    name: 'Mihail Dimitrov',
    ocupation: 'Student in the national highschool of sciences',
    phone: '1234567890',
    email: 'mighty.strong1235@gmail.com',
    links: [
        'facebook.com/misho',
        'twitter.com/GothamChess',
        'linkedin.com/in/mihail-d/',
    ],
    description: "Lorem ipsum dolor sfiuwegtf qw79egfqgw ew67o 8o7wqg8o7 ftwg8oe 7gf8ow7qeg f67owetgqf67 qit amet, consectetur adipiscing elit. Ut id purus ante. Ut vena, euismod et ante vel, consectetur accumsan diam. Aenean iaculis posuere odio, sit amet pulvinar mauris convallis non. Curabitur tempor ultrices eros, mattis mollis sapien pharetra vel. Incongue vulputate. Nam non diam pellentesque, lacinia ex eget, tristique sem.",
    posts: [
        { id: 1, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', title: 'Product1', subtitle: 'Description1', visits: 10 },
        { id: 2, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', title: 'Product2', subtitle: 'Description2', visits: 10 },
        { id: 3, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', title: 'Product3', subtitle: 'Description3', visits: 10 },
        { id: 4, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', title: 'Product4', subtitle: 'Description4', visits: 10 },
    ],
    // achievements: {
    //     created: 30,
    //     sold: 20,
    // }
}

export default function BloggerPage() {

    const { t } = useTranslation();

    const facebookRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    const linkedinRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm;
    const twitterRegex = /((?:https?:\/\/)?twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/;


    return (
        <Box position='relative' >
            <Box width={'100%'} position='absolute' height={'100vh'} overflow='hidden'>
                <img width={'100%'} src={Gradient} />
            </Box>

            <Box className='topSection' width='100%' sx={{
                position: 'relative',
                marginTop: '200px',
            }}>
                <Container className='topContent'>
                    <Card elevation={2} sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        overflow: 'visible',
                        pr: { xs: '0', md: '30px' },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            position: 'relative',
                            width: { xs: '50%', md: '30%' },
                            margin: { xs: '0 auto', md: '0 50px' }
                        }}>
                            <Box className='authorImg' sx={{
                                    width: '100%',
                                    position: 'absolute',
                                    border: '10px solid white',
                                    bottom:'10px',
                                    overflow: 'hidden',
                                    borderRadius: '50%',
                                    aspectRatio: '1/1',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}>
                                    <img width={'100%'} height={'100%'} src='https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/UUID-cl90hcenj8183939tqyaa4oyxsx/public' />
                                </Box>

                            {/* <Box sx={{
                                position: 'absolute',
                                width: '100%',
                                bottom: '50px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                display:{ xs: 'none', md: 'flex' },
                            }}>
                                <Box display={'flex'} flexDirection='column' textAlign={'center'}>
                                    <Typography variant='h3'>{props.achievements.created}</Typography>
                                    <Typography variant='subtitle2'>{t('products-created')}</Typography>
                                </Box>
                                <Box display={'flex'} flexDirection='column' textAlign={'center'}>
                                    <Typography variant='h3'>{props.achievements.sold}</Typography>
                                    <Typography variant='subtitle2'>{t('sales')}</Typography>
                                </Box>
                            </Box> */}
                        </Box>
                        <Box sx={{
                            flex:1,
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            flexDirection: 'column',
                            py: 3,
                        }} >
                            <Typography variant='h1' marginBottom={'20px'} textAlign='center'>{props.name}</Typography>
                            <Typography variant='subtitle1' marginBottom={'30px'} textAlign='center' >{props.ocupation}</Typography>
                        </Box>
                    </Card>
                </Container>
            </Box>

            <Container className='mainContent' sx={{
                position: 'relative',
                marginBottom: '100px',
                display: 'flex',
                width: '100%',
                flexDirection: { xs: 'column', md: 'row' },
            }}>
                <Card className='authorSideBar' elevation={2} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1',
                        py: '20px',
                        px: '5px',
                        margin: '10px 0'
                    }}>
                        <Box sx={{ px: 2 }}>
                            <Typography
                                variant='h4'
                                sx={{
                                    textAlign: "center",
                                    position: "relative",
                                    ":after": {
                                        content: '""',
                                        position: "absolute",
                                        width: '20%',
                                        height: "3px",
                                        bottom: "-10px",
                                        left: "40%",
                                        borderBottom: "3px dashed",
                                        borderColor: "background.bordoRed",
                                    },
                                }}
                            >
                                {t('contact-info')}
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <ContactBox>
                                    <PhoneIcon />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant='subtitle1'>
                                            {props.phone}
                                        </Typography>
                                    </Box>
                                </ContactBox>
                                <ContactBox>
                                    <EmailIcon />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant='subtitle1'>
                                            {props.email}
                                        </Typography>
                                    </Box>
                                </ContactBox>
                            </Box>
                        </Box>
                        <Box sx={{ p: 2, mt: 2 }}>
                            <Typography
                                variant='h4'
                                sx={{
                                    textAlign: "center",
                                    position: "relative",
                                    ":after": {
                                        content: '""',
                                        position: "absolute",
                                        width: '20%',
                                        height: "3px",
                                        bottom: "-10px",
                                        left: "40%",
                                        borderBottom: "3px dashed",
                                        borderColor: "background.bordoRed",
                                    },
                                }}
                            >
                                {t('links')}
                            </Typography>
                            <Box className='authorLinks' sx={{ mt: 3 }}>
                                {props.links.map((link, index) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }} key={index}>
                                        {facebookRegex.exec(link) ? <FacebookIcon />
                                            : linkedinRegex.exec(link) ? <LinkedInIcon />
                                                : twitterRegex.exec(link) ? <TwitterIcon />
                                                    : <LinkIcon />
                                        }

                                    
                                        <Typography>{link}</Typography>
                                    </Box>
                                ))}
                                </Box>
                        </Box>
                </Card>
                <Card className='authorContent' elevation={2} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '2',
                    py: '20px',
                    px: '5px',
                    m: '10px',
                    mr: '0',
                }}>
                    <Box display={'flex'} margin={'20px'} marginTop='10px'>
                        <Typography variant='subtitle2'>{props.description}</Typography>
                    </Box>
                    <Box display={'flex'} margin={'10px auto'}>
                        <Typography variant='h2'>{t('created-posts')}</Typography>
                    </Box>
                    <Box display={'flex'}>
                        <CreatedPosts posts={props.posts} />
                    </Box>
                </Card>
            </Container>

        </Box>

    );
}