import { Box, Button, Card, Stack, Chip, Autocomplete, Container, Typography, Tabs, Tab, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from "@mui/material";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import FormBuilder from '../../../components/FormBuilder';

const AddBlog = () => {
    const useStyles = makeStyles({
        flexContainer: {
            justifyContent: 'end',
        },
    });

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            [{ 'align': [] }],
            [{ 'direction': 'rtl' }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
            ],
            ["link", "image", "video"],
            ['clean']
        ]
    }

    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }
    const handleAccept = () => {
        console.log(titleBG)
        console.log(titleEN)
        console.log(subtitleBG)
        console.log(subtitleEN)
        console.log(image)
        console.log(categories)
        console.log(valueBG)
        console.log(valueEN)
        setOpen(false)
    }

    const handleImageUpload = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
    }

    const handleTextLangChange = (event, value) => {
        setTextLang(value)
    }
    const handleTitleLangChange = (event, value) => {
        setTitleLang(value)
    }
    const handleSubtitleLangChange = (event, value) => {
        setSubtitleLang(value)
    }

    const [titleBG, setTitleBG] = useState('');
    const [titleEN, setTitleEN] = useState('');
    const [titleLang, setTitleLang] = useState('bg');

    const [subtitleBG, setSubtitleBG] = useState('');
    const [subtitleEN, setSubtitleEN] = useState('');
    const [subtitleLang, setSubtitleLang] = useState('bg');

    const [image, setImage] = useState('')

    const [valueBG, setValueBG] = useState('');
    const [valueEN, setValueEN] = useState('');
    const [textLang, setTextLang] = useState('bg');

    const { i18n, t } = useTranslation();

    let categoryOptions = [
        { value: 1, label: 'Green' },
        { value: 2, label: 'Yellow' },
        { value: 3, label: 'Chemistry' },
        { value: 4, label: 'Biology' },
        { value: 5, label: 'Josh' },
        { value: 6, label: 'Bill Gates' },
        { value: 7, label: 'Elon Musk' },
        { value: 8, label: 'John Lennon' },
    ]

    const [categories, setCategories] = useState([]);

    const handleSelectCategory = (event, value) => {
        setCategories(value)
    }

    const validationSchema = Yup.object().shape({
        //name: Yup.string().max(255).required(t('name-required'))
    });

    const onSubmit = (values, { setSubmitting }) => {
        console.log(valueBG)
        setSubmitting(false)
    };

    const fields = [
        { type: 'upload', name: 'image', label: t('image'), accept: '.jpg,.png,.jpeg' },
        { type: 'autocomplete', name: 'category', label: t('category'), options: categoryOptions, multiple: true },
        {
            type: 'lang', name: 'lang', selectors: ['bg', 'en'], fields: [
                { type: 'text', name: 'title', label: t('title') },
                { type: 'text', name: 'subtitle', label: t('subtitle') },
                { type: 'rich-text', name: 'description', label: t('description') }
            ]
        },
    ];

    const submitButton = {
        color: 'bordoRed'
    };

    return (
        <>
            <Helmet>
                <title>{t('blog-create')} | {t('ban')}</title>
            </Helmet>
            {/* <Dialog
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
                        {t('yes')}
                    </Button>
                </DialogActions>
            </Dialog> */}

            <Card sx={{ mt: 10, mb: 4, p: 2 }}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h4" sx={{ my: 2 }}>{t('create-blog-welcome-text')}</Typography>
                    <Box display={'flex'} justifyContent={'end'} alignItems={'center'}>
                        <Button onClick={() => setPreview(!preview)} color="bordoRed" sx={{
                            border: 'solid 1px #96011c',
                            mr: 2,
                            height: '55px',
                        }}>
                            {preview ? t('edit') : t('preview')}
                        </Button>
                        <Button onClick={() => setOpen(true)} sx={{
                            height: '55px',
                            backgroundColor: '#96011c',
                            '&:hover': {
                                backgroundColor: '#96011c',
                            }
                        }}>
                            {t('create')}
                        </Button>
                    </Box>
                </Box>

            </Card>

            <Card sx={{
                p: 2,
                display: !preview ? 'block' : 'none'
            }}>
                <PerfectScrollbar>
                    <Box>
                        <FormBuilder
                            fields={fields}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            submitButton={submitButton}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>

            {/* PREVIEW */}
            <Box display={preview ? 'flex' : 'none'} sx={{ mb: 3 }}>
                {/* Main Content */}
                <Card sx={{ flex: 6, mr: 3, p: 3 }}>
                    <Typography variant="h3" sx={{ mb: 3 }}>{i18n.language == 'bg' ? titleBG : titleEN}</Typography>
                    <Typography variant="subtitle1" sx={{ mb: 5 }}>{i18n.language == 'bg' ? subtitleBG : subtitleEN}</Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <img width={'100%'} src={image} />
                    </Box>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: i18n.language == 'bg' ? valueBG : valueEN,
                        }}
                    />
                </Card>

                {/* Post Information */}
                <Card sx={{ flex: 1, p: 3 }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>{t('about-post')}</Typography>
                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                        <PersonIcon />
                        <Typography variant="subtitle2" sx={{ ml: 1 }}>{t('current-user-name')}</Typography>
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                        <CalendarMonthIcon />
                        <Typography variant="subtitle2" sx={{ ml: 1 }}>{t('date')}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ ml: 1, mt: 3, textAlign: 'center' }}>{t('categories')}:</Typography>
                    <Stack direction={'row'} sx={{ justifyContent: 'center', flexWrap: 'wrap', mt: 1 }} >
                        {categories.map((category, idx) => (
                            <Chip sx={{ fontSize: '100%', mb: 1, background: 'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)', color: 'white' }} label={category.name} />
                        ))}
                    </Stack>
                </Card>
            </Box>
        </>
    )
}

export default AddBlog;