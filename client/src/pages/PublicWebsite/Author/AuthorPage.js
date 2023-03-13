import {Container, Box, Typography, Card} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


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
        {name:'Product1',description:'Description1'},
        {name:'Product2',description:'Description2'},
        {name:'Product3',description:'Description3'},
        {name:'Product4',description:'Description4'}
    ],
}

export default function AuthorPage(){

    const handleClick = ({link}) => {
        window.location.replace(link);
    }

    const facebookRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    const linkedinRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm;
    const twitterRegex = /((?:https?:\/\/)?twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/;


    return(
        <Box >
            <Box width={'100%'} height='30%' overflow={'hidden'} sx={{
                display:'flex',
                justifyContent:'center',
                alignContent:'center'
            }}>
                <img width={'100%'} src='https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'/>
            </Box>
            <Box className='topSection' width='100%'>
                <Container className='topContent'>
                    <Card sx={{
                        display:'flex',
                        overflow:'visible',
                        px:'30px'
                    }}>
                        <Box boxShadow={'7px 7px 10px'} marginRight='50px' position={'relative'} bottom={'100px'} className='authorImg' overflow={'hidden'} flex='1.5' border={'solid white 10px'} borderRadius='50%' style={{
                            aspectRatio:'1/1',
                            display:'flex',
                            justifyContent:'center',
                            alignContent:'center'
                        }}>
                            <img  height='100%' src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' />
                        </Box>
                        <Box display='flex' justifyContent={'center'} flex={'4'} flexDirection={'column'} >
                            <Typography variant='h1' marginBottom={'20px'} textAlign='center'>{props.name}</Typography>
                            <Typography variant='subtitle1' marginBottom={'30px'} textAlign='center' >{props.ocupation}</Typography>
                            <Box className='authorLinks' display={'flex'} flexDirection='row' justifyContent={'space-evenly'} flexWrap="wrap" >
                            {props.links.map(link =>(
                                    <Box display={'flex'} marginBottom='10px'>
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
                display:'flex',
                width:'100%',
                flexDirection:'row',
            }}>
                <Card className='authorSideBar' sx={{
                    display:'flex',
                    flexDirection:'column',
                    flex:'1',
                    py:'20px',
                    px:'5px',
                    m:'10px',
                    ml:'0',
                }}>
                    <Box display={'flex'} margin={'0 auto'}>
                        <PhoneIcon/>
                        <Typography variant='subtitle1'>{props.phone}</Typography>
                    </Box>
                    <Box display={'flex'} margin={'0 auto'}>
                        <EmailIcon/>
                        <Typography variant='subtitle1'>{props.email}</Typography>
                    </Box>
                </Card>
                <Card className='authorContent' sx={{
                    display:'flex',
                    flex:'2',
                    py:'20px',
                    px:'5px',
                    m:'10px',
                    mr:'0',
                }}>
                    <Box></Box>
                </Card>
            </Container>
            
        </Box>

    );
}