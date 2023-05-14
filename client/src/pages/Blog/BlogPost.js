import { Box, Card, Typography, Container, Stack, Chip } from "@mui/material"
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const post = {
    date: '2022-05-03', 
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", 
    author:'John Lennon', 
    title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    text: '<h1>This is the Title of my blog</h1><br><p>This is the first paragraph of my blog</p>',
    image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg',
    categories:['politics', 'chemistry'],
}

const BlogPost = () =>{

    const { t } = useTranslation();

    return(
        <Container>
            {/* <Card sx={{ mt:10, px:3 }}>
                <Typography variant="h3" sx={{ my:4}}>{post.title}</Typography>
                <Typography variant="subtitle1" sx={{ mb:4 }}>{post.description}</Typography>
            </Card> */}
            <Box display={'flex'}>
                {/* Main Content */}
                <Card sx={{ flex:6, mt:10, mr:3, p:3 }}>
                    <Typography variant="h3" sx={{ mb:3}}>{post.title}</Typography>
                    <Typography variant="subtitle1">{post.description}</Typography>
                    <div
                    dangerouslySetInnerHTML={{
                        __html: post.text,
                    }}
                />
                </Card>

                {/* Post Information */}
                <Card sx={{ flex:1, mt:10, p:3}}>
                    <Typography variant="h5" sx={{ textAlign:'center' }}>{t('about-blog')}</Typography>
                    <Box sx={{ mt:3, display:'flex', alignItems:'center' }}>
                        <PersonIcon/>
                        <Typography variant="subtitle2" sx={{ ml:1 }}>{post.author}</Typography>
                    </Box>
                    <Box sx={{ mt:3, display:'flex', alignItems:'center' }}>
                        <CalendarMonthIcon/>
                        <Typography variant="subtitle2" sx={{ ml:1 }}>{post.date}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ ml:1, mt:3, textAlign:'center' }}>{t('categories')}:</Typography>
                    <Stack direction={'row'} sx={{ justifyContent:'center', flexWrap:'wrap', mt:1 }} >
                        {post.categories.map( (category, idx) => (
                            <Chip sx={{ fontSize:'100%', mb:1, background:'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)', color: 'white' }} label={category}/>
                        ))}
                    </Stack>
                </Card>
            </Box>
        </Container>
    )
}

export default BlogPost