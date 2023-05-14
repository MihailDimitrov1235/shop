import { Box, Button, Card, Stack, Chip, Container, Typography, Tabs, Tab, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const BlogCreate = () =>{

    const useStyles = makeStyles({
        flexContainer: {
            justifyContent: 'end',
        },
    });

    const modules = {
          toolbar: [
            [{header: [1,2,3,4,5,6, false]}],
            [{font: []}],
            [{size: []}],
            [{ 'align': [] }],
            [{ 'direction': 'rtl' }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1"},
                { indent: "+1"}
            ],
            ["link", "image", "video"],
            ['clean'] 
          ]
        }
    
    const [lang, setLang] = useState('bg');
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(false);

    const handleClose = () =>{
        setOpen(false)
    }
    const handleAccept = () =>{
        console.log(valueBG)
        console.log(valueEN)
        setOpen(false)
    }

    const handleLangChange = (event, value) => {
        setLang(value)
    }

    const [valueBG, setValueBG] = useState('');
    const [valueEN, setValueEN] = useState('');
    const { i18n, t } = useTranslation();

    return(
        <Container>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{t('create-post')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('create-post-msg')}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleAccept} color="error">
                        {t('accept')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Card sx={{ mt:10, mb:4, p:2}}>
                <Box display={'flex'}>
                    <Typography variant="h4" sx={{ my:2 }}>{t('create-blog-welcome-text')}</Typography>
                    <Box display={'flex'} justifyContent={'end'} alignItems={'center'}>
                        <Button onClick={ () => setPreview(!preview)} color="bordoRed" sx={{
                            border: 'solid 1px #96011c',
                            mr:2,
                            height:'55px',
                        }}>
                            {t('preview')}
                        </Button>
                        <Button onClick={() => setOpen(true)} sx={{ 
                            height:'55px',
                            backgroundColor:'#96011c',
                            '&:hover':{
                                backgroundColor:'#96011c',
                            }
                            }}>
                            {t('submit')}
                        </Button>
                    </Box>
                </Box>
                
            </Card>
            <Box display={!preview? 'block' : 'none'}>
                <Tabs value={lang} onChange={handleLangChange} indicatorColor='bordoRed' textColor='bordoRed'>
                    <Tab value={'bg'} label={t('bulgarian')} />
                    <Tab value={'en'} label={t('english')} />
                </Tabs>
                <ReactQuill style={{ minHeight:'200px', display:lang==='bg'? 'block' : 'none' }} theme="snow" value={valueBG} onChange={setValueBG} modules={modules} />
                <ReactQuill style={{ minHeight:'200px', display:lang==='en'? 'block' : 'none' }} theme="snow" value={valueEN} onChange={setValueEN} modules={modules} />
            </Box>

            <Box display={preview? 'flex' : 'none'} sx={{ mb:3 }}>
                {/* Main Content */}
                {/* <Card sx={{ flex:6, mt:10, mr:3, p:3 }}>
                    <Typography variant="h3" sx={{ mb:3}}>{post.title}</Typography>
                    <Typography variant="subtitle1" sx={{ mb: 5}}>{post.description}</Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <img src={post.image}/>
                    </Box>
                    <div
                    dangerouslySetInnerHTML={{
                        __html: post.text,
                    }}
                />
                </Card> */}

                {/* Post Information */}
                {/* <Card sx={{ flex:1, mt:10, p:3}}>
                    <Typography variant="h5" sx={{ textAlign:'center' }}>{t('about-post')}</Typography>
                    <Box component={Link} to={"/profile/" + post.author.id} sx={{ mt:3, display:'flex', alignItems:'center' }}>
                        <PersonIcon/>
                        <Typography variant="subtitle2" sx={{ ml:1 }}>{post.author.name}</Typography>
                    </Box>
                    <Box sx={{ mt:3, display:'flex', alignItems:'center' }}>
                        <CalendarMonthIcon/>
                        <Typography variant="subtitle2" sx={{ ml:1 }}>{post.date}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ ml:1, mt:3, textAlign:'center' }}>{t('categories')}:</Typography>
                    <Stack direction={'row'} sx={{ justifyContent:'center', flexWrap:'wrap', mt:1 }} >
                        {post.categories.map( (category, idx) => (
                            <Chip clickable component={Link} to={`/blog?category=${encodeURIComponent(category.id)}`} sx={{ fontSize:'100%', mb:1, background:'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)', color: 'white' }} label={category.name}/>
                        ))}
                    </Stack>
                </Card> */}
            </Box>


            </Container>
    )
}

export default BlogCreate