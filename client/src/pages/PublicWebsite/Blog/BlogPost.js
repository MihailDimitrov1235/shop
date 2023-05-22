import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Card, Typography, Container, Stack, Chip, Pagination, TextField, Button } from '@mui/material'
import Comment from '../../../components/blog/Comment';
import blogService from '../../../services/blog';
import moment from 'moment';

import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const BlogPost = () => {
    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const [writingComment, setWrittingComment] = useState(false);
    const [post, setPost] = useState({
        title: '',
        subtitle: '',
        content: '',
        image_path: '',
        created_at: '',
        categories: [],
        comments: []
    })
    const newCommentRef = useRef(null);

    useEffect(() => {
        blogService.getBySlug(slug, i18n.language)
            .then((res) => {
                setPost(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [i18n.language])

    const handleSubmitComment = () => {
        if (newCommentRef.current.value) {
            console.log(newCommentRef.current.value)
            newCommentRef.current.value = ''
            setWrittingComment(false)
        }

    }

    const handleCommentPageChange = (event, page) => {
        console.log(page);
    };

    return (
        <Container>
            {/* <Card sx={{ mt:10, px:3 }}>
                <Typography variant="h3" sx={{ my:4}}>{post.title}</Typography>
                <Typography variant="subtitle1" sx={{ mb:4 }}>{post.description}</Typography>
            </Card> */}
            <Box sx={{ mb: 3, display: { md: 'block', lg: 'flex' } }}>
        {/* Main Content */}
        <Card sx={{ flex: 6, mt: 10, mr: 3, p: 3 }}>
            <Typography variant='h3' sx={{ mb: 3 }}>{post.title}</Typography>
            <Typography variant='subtitle1' sx={{ mb: 5 }}>{post.subtitle}</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img width={'100%'} src={`${process.env.REACT_APP_ASSETS}/${post.image_path}`} />
            </Box>

            <div
                dangerouslySetInnerHTML={{
                    __html: post.content,
                }}
            />
        </Card>

        {/* Post Information */}
        <Card sx={{ flex: 1, mt: 10, p: 3 }}>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>{t('about-post')}</Typography>

            <Box sx={{ display: { md: 'flex', lg: 'block' } }}>
                <Box flex={1}>
                    {/* <Box component={Link} to={"/profile/" + post.author.id} sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PersonIcon />
                        <Typography variant="h6" sx={{ ml: 1 }}>{post.author.name}</Typography>
                    </Box> */}
                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CalendarMonthIcon />
                        <Typography variant="h6" sx={{ ml: 1 }}>{moment(post.created_at).format('DD.MM.YYYY')}</Typography>
                    </Box>
                </Box>

                <Box flex={1}>
                    <Typography variant='h4' sx={{ ml: 1, mt: 3, textAlign: 'center' }}>{t('categories')}:</Typography>
                    <Stack gap={1} direction={'row'} sx={{ justifyContent: 'center', flexWrap: 'wrap', mt: 1 }} >
                        {post.categories.map((category, idx) => (
                            <Chip
                                clickable
                                component={Link}
                                to={`/blog?category=${encodeURIComponent(category.id)}`}
                                sx={{ fontSize: '100%', mb: 1, background: 'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)', color: 'white' }}
                                label={category.name}
                                key={idx}
                            />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Card>
    </Box >

    {/* Comments */}

    < Typography
        variant="h3"
        sx={{
            textAlign: "center",
            position: "relative",
            ":after": {
                content: '""',
                position: "absolute",
                width: "10%",
                height: "3px",
                bottom: "-10px",
                left: "45%",
                borderBottom: "3px dashed",
                borderColor: "background.bordoRed",
            },
        }}
    >
        {t('comment-section')}
    </Typography >

    <Card sx={{ p: 2, mt: 4 }}>
        <Box>
            <TextField
                inputRef={newCommentRef}
                fullWidth
                label={t('comment')}
                multiline
                color='bordoRed'
            />
            <Box display={'flex'} justifyContent={'end'}>
                <Button sx={{ mt: 1 }} color='bordoRed' variant='text' onClick={handleSubmitComment}>
                    {t('submit-comment')}
                </Button>
            </Box>
        </Box>

        {/* {writingComment &&
                    <Box sx={{ mx: 2 }}>
                        <TextField
                            inputRef={newCommentRef}
                            fullWidth
                            color='primary'
                            label={t('comment')}
                            multiline
                        />
                        <Box display={'flex'} justifyContent={'end'}>
                            <Button sx={{ mt: 1, color: 'black' }} onClick={handleSubmitComment}>
                                {t('submit-comment')}
                            </Button>
                        </Box>

                    </Box>
                } */}
    </Card>

    <Card sx={{ p: 2, mt: 4 }}>
        {post.comments.length > 0 ? (
            <>
                {post.comments.map(comment => (
                    <Comment props={comment} />
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Pagination count={10}
                        size='medium'
                        variant='outlined'
                        onChange={handleCommentPageChange}
                    />
                </Box>
            </>
        ) : (
            <Typography variant='h5' sx={{ textAlign: 'center', fontStyle: 'italic' }}>{t('no-comments')}</Typography>
        )}
    </Card>
</Container >
    )
}

export default BlogPost