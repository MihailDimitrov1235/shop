import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container, Box, Typography, Card, TextField, Tab, Tabs, Button, IconButton, styled, Avatar, Badge } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import Gradient from './authorGradient.svg';
import CreatedProducts from './CreatedProducts';
import { useSpring, animated } from '@react-spring/web';
import { useHover } from '@use-gesture/react';
import ApproveDoalog from '../../../components/MainTable/ApproveDialog'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLinkIcon from '@mui/icons-material/AddLink';

import UploadIcon from '@mui/icons-material/Upload';

const useStyles = makeStyles({
    flexContainer: {
        justifyContent: 'end',
    },
});

const ContactBox = styled(Box)(() => ({
    display: 'flex',
    margin: '10px auto',
    alignItems: 'center',
    gap: '5px'
}));

const RegisterAuthor = () => {

    const { id } = useParams();

    const [{ approveWidth }, apiApprove] = useSpring(() => ({ approveWidth: '50px' }))

    const bind = useHover(({ hovering }) => {
        apiApprove.start({ approveWidth: hovering ? '130px' : '50px' })
    })

    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);

    const [edit, setEdit] = useState(true);
    const handleEditTabChange = (event, newValue) => {
        setEdit(newValue);
    };

    const [nameLang, setNameLang] = useState('bg');
    const [ocupationLang, setOcupationLang] = useState('bg');
    const [descLang, setDescLang] = useState('bg');

    const [props, setProps] = useState({
        phone: '',
        email: '',
        links: [],
        achievements: {
            created: 30,
            sold: 20,
        }
    });
    const [propsBG, setPropsBG] = useState({
        name: '',
        ocupation: '',
        description: '',
    });
    const [propsEN, setPropsEN] = useState({
        name: '',
        ocupation: '',
        description: '',
    });

    const handleApprove = (id) => {
        console.log(id[0])
        console.log(props)
        console.log(propsBG)
        console.log(propsEN)
    }

    function handleRemoveLink(index) {
        let newProps = Object.assign({}, props);
        newProps.links.splice(index, 1);
        setProps(newProps);
    }

    const handleAddLink = () => {
        let newProps = Object.assign({}, props);
        newProps.links.push('');
        setProps(newProps)
    }

    const handleLinkChange = (index, value) => {
        let newProps = Object.assign({}, props);
        newProps.links[index] = value;
        setProps(newProps);
    }

    const handleNameTabChange = (event, newValue) => {
        setNameLang(newValue);
        if (newValue == 'bg') {
            setNameValue(propsBG.name)
        } else if (newValue == 'en') {
            setNameValue(propsEN.name)
        }
    };
    const handleNameChange = (event) => {
        setNameValue(event.target.value)
        if (nameLang == 'bg') {
            let newProps = propsBG
            newProps.name = event.target.value
            setPropsBG(newProps)
        } else if (nameLang == 'en') {
            let newProps = propsEN
            newProps.name = event.target.value
            setPropsEN(newProps)
        }
    };

    const handleOcupationTabChange = (event, newValue) => {
        setOcupationLang(newValue);
        if (newValue == 'bg') {
            setOcupationValue(propsBG.ocupation)
        } else if (newValue == 'en') {
            setOcupationValue(propsEN.ocupation)
        }
    };
    const handleOcupationChange = (event) => {
        setOcupationValue(event.target.value)
        if (ocupationLang == 'bg') {
            let newProps = propsBG
            newProps.ocupation = event.target.value
            setPropsBG(newProps)
        } else if (ocupationLang == 'en') {
            let newProps = propsEN
            newProps.ocupation = event.target.value
            setPropsEN(newProps)
        }
    };

    const handleDescTabChange = (event, newValue) => {
        setDescLang(newValue);
        if (newValue == 'bg') {
            setDescValue(propsBG.description)
        } else if (newValue == 'en') {
            setDescValue(propsEN.description)
        }
    };
    const handleDescChange = (event) => {
        setDescValue(event.target.value)
        if (descLang == 'bg') {
            let newProps = propsBG
            newProps.description = event.target.value
            setPropsBG(newProps)
        } else if (descLang == 'en') {
            let newProps = propsEN
            newProps.description = event.target.value
            setPropsEN(newProps)
        }
    };

    const [nameValue, setNameValue] = useState(propsBG.name);
    const [ocupationValue, setOcupationValue] = useState(propsBG.ocupation);
    const [descValue, setDescValue] = useState(propsBG.description);

    const { t, i18n } = useTranslation();

    const facebookRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    const linkedinRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm;
    const twitterRegex = /((?:https?:\/\/)?twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/;


    return (
        <>
            <Button sx={{ color: '#f1f1f1', display: 'contents' }} onClick={() => setOpenDialog(true)}>
                <animated.div {...bind()} style={{
                    width: approveWidth,
                    height: '50px',
                    zIndex: '3',
                    right: 0,
                    position: 'fixed',
                    top: '50%',
                    borderRadius: ' 25px 0 0 25px',
                    background: '#96011c',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '10px'
                }}>
                    <Box width={'100%'} display={'flex'} justifyContent={'start'} alignItems={'center'}>

                        <DoneIcon sx={{
                            ml: 1,
                            mr: 1,
                            color: '#f1f1f1'
                        }} />

                        {t('register')}

                    </Box>

                </animated.div>
            </Button>

            <ApproveDoalog approveId={Number(id)} setApproveId={() => { }} approveHandler={handleApprove} newRequest={() => { }} open={openDialog} setOpen={setOpenDialog} />

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
                            flexContainer: classes.flexContainer
                        }} textColor='inherit' sx={{ color: 'black', }} >
                            <Tab sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px 10px 0 0',
                                mr: 1
                            }} value={false} label={t('preview')} />
                            <Tab sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px 10px 0 0',
                                mr: 1
                            }} value={true} label={t('edit')} />
                        </Tabs>
                        <Card elevation={2} sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            overflow: 'visible',
                            pr: { xs: '0', md: '30px' },
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignContent: 'center',
                                position: 'relative',
                                width: { xs: '50%', md: '30%' },
                                margin: { xs: '0 auto', md: '0 50px' }
                            }}>
                                {edit ? (
                                    <Button className='authorImg' component='label' sx={{
                                        width: '100%',
                                        position: 'absolute',
                                        border: '10px solid white',
                                        bottom: '10px',
                                        overflow: 'hidden',
                                        borderRadius: '50%',
                                        aspectRatio: '1/1',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: 0,
                                        background: 'white!important'
                                    }}>
                                        <UploadIcon sx={{
                                            color: 'black',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            fontSize: 100
                                        }}
                                        />
                                        <Avatar
                                            src=''
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                '&:hover': {
                                                    opacity: 0.5
                                                }
                                            }}
                                        />
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                ) : (
                                    <Box className='authorImg' sx={{
                                        width: '100%',
                                        position: 'absolute',
                                        border: '10px solid white',
                                        bottom: '20px',
                                        overflow: 'hidden',
                                        borderRadius: '50%',
                                        aspectRatio: '1/1',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Avatar
                                            src='https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/UUID-cl90hcenj8183939tqyaa4oyxsx/public'
                                            sx={{ width: '100%', height: '100%' }}
                                        />
                                    </Box>
                                )}
                            </Box>
                            <Box sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                flexDirection: 'column',
                                py: 3,
                            }} >
                                <Typography variant='h1' marginBottom={'20px'} textAlign='center'>
                                    <Box display={edit ? 'block' : 'none'}>
                                        <Tabs value={nameLang} onChange={handleNameTabChange} indicatorColor='inherit' textColor='inherit'>
                                            <Tab value={'bg'} label={t('bulgarian')} />
                                            <Tab value={'en'} label={t('english')} />

                                        </Tabs>
                                        <TextField
                                            id='name'
                                            placeholder={t('name')}
                                            value={nameValue}
                                            fullWidth
                                            onChange={handleNameChange}
                                            inputProps={{ style: { textAlign: 'center', fontSize: '30px' } }}
                                            color='bordoRed'
                                        />
                                    </Box>

                                    <Box display={edit ? 'none' : 'block'}>
                                        {i18n.language === 'bg' ?
                                            propsBG.name
                                            :
                                            propsEN.name
                                        }
                                    </Box>
                                </Typography>
                                <Typography variant='subtitle1' marginBottom={'30px'} textAlign='center' >
                                    <Box display={edit ? 'block' : 'none'}>
                                        <Tabs value={ocupationLang} onChange={handleOcupationTabChange} indicatorColor='inherit' textColor='inherit'>
                                            <Tab value={'bg'} label={t('bulgarian')} />
                                            <Tab value={'en'} label={t('english')} />
                                        </Tabs>
                                        <TextField
                                            id='ocupation'
                                            placeholder={t('ocupation')}
                                            value={ocupationValue}
                                            fullWidth
                                            onChange={handleOcupationChange}
                                            inputProps={{ style: { textAlign: 'center', fontSize: '15px' } }}
                                            color='bordoRed'
                                        />
                                    </Box>

                                    <Box display={edit ? 'none' : 'block'}>
                                        {i18n.language === 'bg' ?
                                            propsBG.ocupation
                                            :
                                            propsEN.ocupation
                                        }
                                    </Box>
                                </Typography>
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
                                        {edit ? (
                                            <TextField
                                                id='phone'
                                                placeholder={t('phone')}
                                                defaultValue={props.phone}
                                                size='small'
                                                margin='dense'
                                                fullWidth
                                                onChange={(event) => props.phone = event.target.value}
                                                inputProps={{ style: { fontSize: '15px' } }}
                                                color='bordoRed'
                                            />
                                        ) : (
                                            <Typography variant='subtitle1'>
                                                {props.phone}
                                            </Typography>
                                        )}
                                    </Box>
                                </ContactBox>
                                <ContactBox>
                                    <EmailIcon />
                                    <Box sx={{ flexGrow: 1 }}>
                                        {edit ? (
                                            <TextField
                                                id='email'
                                                placeholder={t('email')}
                                                defaultValue={props.email}
                                                size='small'
                                                margin='dense'
                                                fullWidth
                                                onChange={(event) => props.email = event.target.value}
                                                inputProps={{ style: { fontSize: '15px' } }}
                                                color='bordoRed'
                                            />
                                        ) : (
                                            <Typography variant='subtitle1'>
                                                {props.email}
                                            </Typography>
                                        )}
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
                                    <Box sx={{ display: 'flex', alignItems: 'center', my: 1.5, gap: 1 }} key={index}>
                                        {!edit && (
                                            facebookRegex.exec(link) ? <FacebookIcon />
                                                : linkedinRegex.exec(link) ? <LinkedInIcon />
                                                    : twitterRegex.exec(link) ? <TwitterIcon />
                                                        : <LinkIcon />
                                        )}

                                        {edit ? (
                                            <>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <TextField
                                                        id='link'
                                                        placeholder={t('link')}
                                                        value={link}
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => handleLinkChange(index, event.target.value)}
                                                        inputProps={{ style: { textAlign: 'center', fontSize: '14px' } }}
                                                        color='bordoRed'
                                                    />
                                                </Box>
                                                <Box>
                                                    <IconButton onClick={() => handleRemoveLink(index)} color='error'>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </>
                                        ) : (
                                            <Typography sx={{ fontSize: '16px' }}>{link}</Typography>
                                        )}
                                    </Box>
                                ))}
                                {edit && (
                                    <Button
                                        variant='text'
                                        onClick={handleAddLink}
                                        endIcon={<AddLinkIcon />}
                                        color='inherit'
                                        fullWidth
                                    >
                                        {t('add-link')}
                                    </Button>
                                )}
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
                            <Box display={edit ? 'block' : 'none'} width={'100%'}>
                                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                                    <Tabs value={descLang} onChange={handleDescTabChange} indicatorColor='inherit' textColor='inherit'>
                                        <Tab value={'bg'} label={t('bulgarian')} />
                                        <Tab value={'en'} label={t('english')} />
                                    </Tabs>
                                    <TextField
                                        id='description'
                                        placeholder={t('description')}
                                        value={descValue}
                                        multiline
                                        fullWidth
                                        onChange={handleDescChange}
                                        inputProps={{ style: { fontSize: '15px' } }}
                                        color='bordoRed'
                                    />
                                </Box>
                            </Box>
                            <Box display={edit ? 'none' : 'block'}>
                                <Typography variant='subtitle2'>
                                    {i18n.language === 'bg' ?
                                        propsBG.description
                                        :
                                        propsEN.description
                                    }
                                </Typography>
                            </Box>

                        </Box>
                    </Card>
                </Container>

            </Box>
        </>
    )

}

export default RegisterAuthor;