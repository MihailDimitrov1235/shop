import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Stack, Chip, Typography } from '@mui/material';
import * as Yup from 'yup';
import FormBuilder from '../../../components/FormBuilder';
import formData from '../../../components/FormBuilder/utils/formData';
import blogService from '../../../services/blog';
import categoryService from '../../../services/category';
import useMessage from '../../../hooks/useMessage';

import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const AddBlog = () => {
    const { i18n, t } = useTranslation();
    const [preview, setPreview] = useState(false);
    const [postData, setPostData] = useState({
        image: '',
        category: [],
        lang: {
            bg: {
                title: '',
                subtitle: '',
                content: ''
            },
            en: {
                title: '',
                subtitle: '',
                content: ''
            }
        }
    });
    const [categoryOptions, setCategoriesOptions] = useState([]);
    const { addMessage } = useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        categoryService.getAll(i18n.language)
            .then((res) => {
                const options = res.data.map((category) => ({ label: category.name, value: category.id }));

                setCategoriesOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [i18n.language])

    const validationSchema = Yup.object().shape({
        image: Yup.array().required(t('image-required')),
        category: Yup.array().required(t('category-required')),
        lang: Yup.object({
            bg: Yup.object({
                title: Yup.string().max(255).required(t('title-required')),
                subtitle: Yup.string().required(t('subtitle-required')),
                content: Yup.string().required(t('content-required')),
            }),
            en: Yup.object({
                title: Yup.string().max(255).required(t('title-required')),
                subtitle: Yup.string().required(t('subtitle-required')),
                content: Yup.string().required(t('content-required')),
            })
        })
    });

    const onSubmit = (values, { setSubmitting }) => {
        const data = formData(values, [], ['image']);

        blogService.createPost(data)
            .then((res) => {
                addMessage(t('blog-created'), 'success')
                navigate('/admin/blog');
            })
            .catch((error) => {
                console.log(error);
                setSubmitting(false);
            })
    };

    const fields = [
        { type: 'upload', name: 'image', label: t('image'), accept: '.jpg,.png,.jpeg' },
        { type: 'autocomplete', name: 'category', label: t('category'), options: categoryOptions, multiple: true },
        {
            type: 'lang', name: 'lang', selectors: ['bg', 'en'], fields: [
                { type: 'text', name: 'title', label: t('title') },
                { type: 'text', name: 'subtitle', label: t('subtitle') },
                { type: 'rich-text', name: 'content', label: t('content') }
            ]
        },
    ];

    const submitButton = {
        color: 'bordoRed'
    };

    const handleOnChange = (values) => {
        setPostData(values);
    }

    return (
        <>
            <Helmet>
                <title>{t('blog-create')} | {t('ban')}</title>
            </Helmet>

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
                            handleOnChange={handleOnChange}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>

            {/* PREVIEW */}
            <Box display={preview ? 'flex' : 'none'} sx={{ mb: 3 }}>
                {/* Main Content */}
                <Card sx={{ flex: 6, mr: 3, p: 3 }}>
                    <Typography variant="h3" sx={{ mb: 3 }}>{i18n.language == 'bg' ? postData.lang.bg.title : postData.lang.en.title}</Typography>
                    <Typography variant="subtitle1" sx={{ mb: 5 }}>{i18n.language == 'bg' ? postData.lang.bg.subtitle : postData.lang.en.subtitle}</Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <img width={'100%'} src={postData.image && URL.createObjectURL(postData.image[0])} />
                    </Box>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: i18n.language == 'bg' ? postData.lang.bg.content : postData.lang.en.content,
                        }}
                    />
                </Card>

                {/* Post Information */}
                <Card sx={{ flex: 1, p: 3 }}>
                    <Typography variant='h5' sx={{ textAlign: 'center' }}>{t('about-post')}</Typography>
                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                        <PersonIcon />
                        <Typography variant='subtitle2' sx={{ ml: 1 }}>{t('current-user-name')}</Typography>
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                        <CalendarMonthIcon />
                        <Typography variant='subtitle2' sx={{ ml: 1 }}>{t('date')}</Typography>
                    </Box>
                    <Typography variant='h6' sx={{ ml: 1, mt: 3, textAlign: 'center' }}>{t('categories')}:</Typography>
                    <Stack direction={'row'} sx={{ justifyContent: 'center', flexWrap: 'wrap', mt: 1 }} >
                        {postData.category && postData.category.map((c, idx) => (
                            <Chip
                                sx={{
                                    fontSize: '100%',
                                    mb: 1,
                                    background: 'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)',
                                    color: 'white'
                                }}
                                label={c.label}
                                key={idx}
                            />
                        ))}
                    </Stack>
                </Card>
            </Box>
        </>
    )
}

export default AddBlog;