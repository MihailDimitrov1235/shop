import { Box, Card, CardMedia, CardContent, CardActions, Typography, Chip, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';

import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const BlogCard = ({ post }) => {
    const router = useRouter()
    return (
        <Box sx={{
            flex: 1,
            flexBasis: { xs: '80%', sm: '45%', md: '30%' },
            maxWidth: { xs: '80%', sm: '45%', md: '30%' },
            mt: 4
        }}>
            <Link href={router.pathname + '/' + post.slug}>
                <Card sx={{ borderRadius: 4 }}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={`${process.env.REACT_APP_ASSETS}/${post.image_path}`}
                        title={post.title}
                    />
                    <CardContent>
                        <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
                            {post.categories.map((category, idx) => (
                                <Chip
                                    sx={{
                                        fontSize: '100%',
                                        background: 'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)',
                                        color: 'white'
                                    }}
                                    label={category.name}
                                    key={idx}
                                />
                            ))}
                        </Stack>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant='h4'>{post.title}</Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant='subtitle2'>{post.subtitle}</Typography>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon />
                            <Typography variant="subtitle1">
                                {post.blogger.name}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarMonthIcon />
                            <Typography variant="subtitle1">
                                {moment(post.created_at).format('DD.MM.YYYY')}
                            </Typography>
                        </Box>
                    </CardActions>
                </Card>
            </Link>
        </Box>
    )
}

export default BlogCard