import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Box, Typography, Card, TextField, Tab, Tabs } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import Gradient from './authorGradient.svg';
import CreatedProducts from './CreatedProducts';

const useStyles = makeStyles({
    flexContainer: {
        justifyContent: 'end',
    },
  });

const PreviewAuthor = () =>{
    const classes = useStyles();

    const [edit, setEdit] = useState(true);
    const handleEditTabChange = (event, newValue) => {
        setEdit(newValue);
    };

    const [nameLang, setNameLang] = useState('bg');
    const [ocupationLang, setOcupationLang] = useState('bg');
    const [descLang, setDescLang] = useState('bg');

    const [props, setProps] = useState({
        name: 'Mihail Dimitrov',
        ocupation: 'Student in the national highschool of sciences',
        phone: '1234567890',
        email: 'mighty.strong1235@gmail.com',
        links: [
            'facebook.com/misho',
            'twitter.com/GothamChess',
            'linkedin.com/in/mihail-d/',
        ],
        products: [
            { id: 1, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', name: 'Product1', description: 'Description1', sold: 10 },
            { id: 2, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', name: 'Product2', description: 'Description2', sold: 10 },
            { id: 3, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', name: 'Product3', description: 'Description3', sold: 10 },
            { id: 4, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', name: 'Product4', description: 'Description4', sold: 10 },
        ],
        achievements: {
            created: 30,
            sold: 20,
        }
    });
    const [propsBG, setPropsBG] = useState({
        name: 'Михаил d',
        ocupation: 'Student in the national highschool of sciences',
        description: "Lorem ipsum dolor sfiuwegtf qw79egfqgw ew67o 8o7wqg8o7 ftwg8oe 7gf8ow7qeg f67owetgqf67 qit amet, consectetur adipiscing elit. Ut id purus ante. Ut vena, euismod et ante vel, consectetur accumsan diam. Aenean iaculis posuere odio, sit amet pulvinar mauris convallis non. Curabitur tempor ultrices eros, mattis mollis sapien pharetra vel. Incongue vulputate. Nam non diam pellentesque, lacinia ex eget, tristique sem.",
    });
    const [propsEN, setPropsEN] = useState({
        name: 'Mihail Dimitrov',
        ocupation: 'Student in the national highschool of sciences',
        description: "Lorem ipsum dolor sfiuwegtf qw79egfqgw ew67o 8o7wqg8o7 ftwg8oe 7gf8ow7qeg f67owetgqf67 qit amet, consectetur adipiscing elit. Ut id purus ante. Ut vena, euismod et ante vel, consectetur accumsan diam. Aenean iaculis posuere odio, sit amet pulvinar mauris convallis non. Curabitur tempor ultrices eros, mattis mollis sapien pharetra vel. Incongue vulputate. Nam non diam pellentesque, lacinia ex eget, tristique sem.",
    });

    const handleNameTabChange = (event, newValue) => {
        setNameLang(newValue);
        if(newValue == 'bg'){
            setNameValue(propsBG.name)
        }else if(newValue == 'en'){
            setNameValue(propsEN.name)
        }
    };
    const handleNameChange = (event) => {
        setNameValue(event.target.value)
        if(nameLang == 'bg'){
            let newProps = propsBG
            newProps.name = event.target.value
            setPropsBG(newProps)
        }else if(nameLang == 'en'){
            let newProps = propsEN
            newProps.name = event.target.value
            setPropsEN(newProps)
        }
    };

    const handleOcupationTabChange = (event, newValue) => {
        setOcupationLang(newValue);
    };
    const handleOcupationChange = (event) => {
        setOcupationValue(event.target.value)
        if(ocupationLang == 'bg'){
            let newProps = propsBG
            newProps.ocupation = event.target.value
            setPropsBG(newProps)
        }else if(ocupationLang == 'en'){
            let newProps = propsEN
            newProps.ocupation = event.target.value
            setPropsEN(newProps)
        }
    };

    const handleDescTabChange = (event, newValue) => {
        setDescLang(newValue);
    };
    const handleDescChange = (event) => {
        setDescValue(event.target.value)
        if(descLang == 'bg'){
            let newProps = propsBG
            newProps.description = event.target.value
            setPropsBG(newProps)
        }else if(descLang == 'en'){
            let newProps = propsEN
            newProps.description = event.target.value
            setPropsEN(newProps)
        }
    };

    const [nameValue, setNameValue] = useState(propsBG.name);
    const [ocupationValue, setOcupationValue] = useState(propsBG.ocupation);
    const [descValue, setDescValue] = useState(propsBG.description);

    const { t } = useTranslation();

    const facebookRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    const linkedinRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm;
    const twitterRegex = /((?:https?:\/\/)?twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/;


    return (
        
        <Box component={'form'} position='relative' >
            <Box width={'100%'} position='absolute' height={'100vh'} overflow='hidden'>
                <img width={'100%'} src={Gradient} />
            </Box>

            <Box className='topSection' width='100%' sx={{
                position: 'relative',
                marginTop: '200px',
            }}>
                <Container className='topContent' position='relative'>
                <Tabs value={edit} onChange={handleEditTabChange} indicatorColor='inherit' classes={{
                    flexContainer:classes.flexContainer
                }} textColor='inherit' sx={{color:'black',}} >
                    <Tab sx={{
                        backgroundColor:'white',
                        borderRadius:'10px 10px 0 0',
                        mr:1
                    }} value={false} label={t('preview')}/>
                    <Tab sx={{
                        backgroundColor:'white',
                        borderRadius:'10px 10px 0 0',
                        mr:1
                    }} value={true} label={t('edit')}/>
                </Tabs>
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
                                width:'100%',
                                position: 'absolute',
                                border: '10px solid white',
                                bottom: '50%',
                                overflow: 'hidden',
                                borderRadius: '50%',
                                aspectRatio: '1/1',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <img height='100%' src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' />
                            </Box>

                            <Box sx={{
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
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            flexDirection: 'column',
                            py: 3,
                        }} >
                            <Typography variant='h1' marginBottom={'20px'} textAlign='center'>
                                {edit?
                                    <>
                                        <Tabs value={nameLang} onChange={handleNameTabChange}  indicatorColor='inherit' textColor='inherit'>
                                            <Tab value={'bg'} label={t('bulgarian')}/>
                                            <Tab value={'en'} label={t('english')}/>
                                            
                                        </Tabs>
                                        <TextField id='name' value={nameValue} fullWidth onChange={handleNameChange}
                                            inputProps={{ style: { textAlign: 'center', fontSize:'30px' }}}
                                        />
                                    </>
                                :
                                    <>{props.name}</>
                                }
                            </Typography>
                            <Typography variant='subtitle1' marginBottom={'30px'} textAlign='center' >
                                {edit?
                                <>
                                    <Tabs value={ocupationLang} onChange={handleOcupationTabChange}  indicatorColor='inherit' textColor='inherit'>
                                        <Tab value={'bg'} label={t('bulgarian')}/>
                                        <Tab value={'en'} label={t('english')}/>
                                    </Tabs>
                                    <TextField id='ocupation' value={ocupationValue} fullWidth onChange={handleOcupationChange}
                                        inputProps={{ style: { textAlign: 'center', fontSize:'15px' }}}
                                    />
                                </>
                                :
                                    <>{props.ocupation}</>
                                }
                            </Typography>
                            <Box className='authorLinks' display={'flex'} flexDirection='row' justifyContent={'space-evenly'} flexWrap="wrap" >
                                {props.links.map((link, index) => (
                                    <Box display={'flex'} marginBottom='30px' marginRight={'30px'} key={index}>
                                        {!edit && (
                                            facebookRegex.exec(link) ? <FacebookIcon />
                                            : linkedinRegex.exec(link) ? <LinkedInIcon />
                                                : twitterRegex.exec(link) ? <TwitterIcon />
                                                    : <LinkIcon />
                                        )}
                                        <Typography>
                                            {edit? 
                                                <TextField id='link' defaultValue={props.links[index]} fullWidth size='small' onChange={(event)=> props.links[index] = event.target.value}
                                                    inputProps={{ style: { textAlign: 'center', fontSize:'12px' }}}
                                                />
                                            :
                                                <>{link}</>
                                            }
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
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
                    <Box display={'flex'} margin={'10px auto'}>
                        <Typography variant='h3'>{t('contact-info')}</Typography>
                    </Box>
                    <Box display={'flex'} margin={'10px auto'}>
                        <PhoneIcon />
                        {edit?
                            <TextField id='phone' defaultValue={props.phone} fullWidth size='small' onChange={(event)=> props.phone = event.target.value}
                                inputProps={{ style: { fontSize:'15px' }}}
                            />
                        :
                            <Typography variant='subtitle1'>
                                {props.phone}
                            </Typography>
                        }
                            
                            
                    </Box>
                    <Box display={'flex'} margin={'10px auto'}>
                        <EmailIcon />
                        {edit? 
                            <TextField id='email' defaultValue={props.email} fullWidth size='small' onChange={(event)=> props.email = event.target.value}
                                inputProps={{ style: { fontSize:'15px' }}}
                            />
                        : 
                            <Typography variant='subtitle1'>
                                {props.email}
                            </Typography>
                        }
                        
                        
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
                        {edit? 
                            <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                                <Tabs value={descLang} onChange={handleDescTabChange} indicatorColor='inherit' textColor='inherit'>
                                    <Tab value={'bg'} label={t('bulgarian')}/>
                                    <Tab value={'en'} label={t('english')}/>
                                </Tabs>
                                <TextField id='description' value={descValue} multiline fullWidth onChange={handleDescChange}
                                    inputProps={{ style: { fontSize:'15px' }}}
                                />
                            </Box>
                        : 
                            <Typography variant='subtitle2'>
                                {props.description}
                            </Typography>
                        }
                    </Box>
                    <Box display={'flex'} margin={'10px auto'}>
                        <Typography variant='h2'>{t('created-products')}</Typography>
                    </Box>
                    <Box display={'flex'}>
                        <CreatedProducts products={props.products} />
                    </Box>
                </Card>
            </Container>

        </Box>
    )
    
}

export default PreviewAuthor;