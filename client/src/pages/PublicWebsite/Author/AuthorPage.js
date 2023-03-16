import { useState, useEffect, useRef } from 'react';
import {Container, Box, Typography, Card} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import Gradient from './authorGradient.svg';
import CreatedProducts from './CreatedProducts';


const props = {
    name:'Mihail Dimitrov',
    ocupation:'Student in the national highschool of sciences',
    phone:'1234567890',
    email:'mighty.strong1235@gmail.com',
    links:[
        'facebook.com/misho',
        'twitter.com/GothamChess',
        'linkedin.com/in/mihail-d/',
    ],
    description:"Lorem ipsum dolor sfiuwegtf qw79egfqgw ew67o 8o7wqg8o7 ftwg8oe 7gf8ow7qeg f67owetgqf67 qit amet, consectetur adipiscing elit. Ut id purus ante. Ut vena, euismod et ante vel, consectetur accumsan diam. Aenean iaculis posuere odio, sit amet pulvinar mauris convallis non. Curabitur tempor ultrices eros, mattis mollis sapien pharetra vel. Incongue vulputate. Nam non diam pellentesque, lacinia ex eget, tristique sem.",
    products:[
        {id:1, image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',name:'Product1',description:'Description1', sold:10},
        {id:2, image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',name:'Product2',description:'Description2', sold:10},
        {id:3, image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',name:'Product3',description:'Description3', sold:10},
        {id:4, image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',name:'Product4',description:'Description4', sold:10},
    ],
    achievements:{
        created:30,
        sold:20,
    }
}

export default function AuthorPage(){

    const {t} = useTranslation();

    const [height, setHeight] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })

    const handleClick = ({link}) => {
        window.location.replace(link);
    }

    const facebookRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    const linkedinRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm;
    const twitterRegex = /((?:https?:\/\/)?twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/;


    return(
        <Box >
            <Box width={'100%'} position='relative'>
            <img width={'100%'} src={Gradient} style={{
                position:'absolute'
            }}/>
            </Box>
            
            <Box className='topSection' width='100%' sx={{
                position:'relative',
                marginTop:'200px',
            }}>
                <Container className='topContent'>
                    <Card ref={ref} elevation={'2'} sx={{
                        display:'flex',
                        overflow:'visible',
                        pr:'30px'
                    }}>
                        <Box marginRight='50px' width={'30%'} sx={{
                            display:'flex',
                            justifyContent:'center',
                            alignContent:'center',
                            position:'relative',
                        }}>
                            <Box position={'relative'} bottom='50%' className='authorImg' overflow={'hidden'} border={'solid white 10px'} borderRadius='50%' style={{
                                aspectRatio:'1/1',
                                display:'flex',
                                justifyContent:'center',
                                alignContent:'center',
                            }}>
                                <img  height='100%' src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' />
                            </Box>

                            <Box position={'absolute'} width='100%'bottom={'50px'} display={'flex'} flexDirection='row'  justifyContent='space-evenly' alignItems={'center'}>
                                    <Box display={'flex'} flexDirection='column' textAlign={'center'}>
                                        <Typography variant='h3'>{props.achievements.created}</Typography>
                                        <Typography variant='subtitle2'>{t('products-created')}</Typography>
                                    </Box>
                                    <Box display={'flex'} flexDirection='column' textAlign={'center'}>
                                        <Typography variant='h3'>{props.achievements.sold}</Typography>
                                        <Typography variant='subtitle2'>{t('sales')}</Typography>
                                    </Box>
                                </Box>

                        </Box>
                        <Box sx={{
                            display:'flex',
                            justifyContent:'space-evenly',
                            flexDirection:'column',
                            py:3,
                        }} >
                            <Typography variant='h1' marginBottom={'20px'} textAlign='center'>{props.name}</Typography>
                            <Typography variant='subtitle1' marginBottom={'30px'} textAlign='center' >{props.ocupation}</Typography>
                            <Box className='authorLinks' display={'flex'} flexDirection='row' justifyContent={'space-evenly'} flexWrap="wrap" >
                            {props.links.map(link =>(
                                    <Box display={'flex'} marginBottom='30px' marginRight={'30px'}>
                                            {facebookRegex.exec(link)? <FacebookIcon/>
                                                : linkedinRegex.exec(link)? <LinkedInIcon/>
                                                    : twitterRegex.exec(link)? <TwitterIcon/>
                                                        : <LinkIcon/>}
                                            <Typography>
                                                {link}
                                            </Typography>
                                    </Box>
                            ))}
                            </Box>
                        </Box>
                    </Card>
                </Container>
            </Box>

            <Container className='mainContent' sx={{
                position:'relative',
                marginBottom:'300px',
                display:'flex',
                width:'100%',
                flexDirection:'row',
            }}>
                <Card className='authorSideBar' elevation={'2'} sx={{
                    display:'flex',
                    flexDirection:'column',
                    flex:'1',
                    py:'20px',
                    px:'5px',
                    m:'10px',
                    ml:'0',
                }}>
                    <Box display={'flex'} margin={'10px auto'}>
                        <Typography variant='h3'>{t('contact-info')}</Typography>
                    </Box>
                    <Box display={'flex'} margin={'10px auto'}>
                        <PhoneIcon/>
                        <Typography variant='subtitle1'>{props.phone}</Typography>
                    </Box>
                    <Box display={'flex'} margin={'10px auto'}>
                        <EmailIcon/>
                        <Typography variant='subtitle1'>{props.email}</Typography>
                    </Box>
                </Card>
                <Card className='authorContent' elevation={'2'} sx={{
                    display:'flex',
                    flexDirection:'column',
                    flex:'2',
                    py:'20px',
                    px:'5px',
                    m:'10px',
                    mr:'0',
                }}>
                    <Box display={'flex'} margin={'20px'} marginTop='10px'>
                        <Typography variant='subtitle2'>{props.description}</Typography>
                    </Box>
                    <Box display={'flex'} margin={'10px auto'}>
                        <Typography variant='h2'>{t('created-products')}</Typography>
                    </Box>
                    <Box display={'flex'}>
                        <CreatedProducts products = {props.products}/>
                    </Box>
                </Card>
            </Container>
            
        </Box>

    );
}