import { Box, Typography, Container, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BlogCard from '../../components/blog/BlogCard';

const props = [
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
]

const BlogMainPage = () =>{
    const { t } = useTranslation();
    return (
        <Box sx={{
            ml: 18,
            mr: 18,
        }}>
            <Box
                sx = {{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                <Typography variant='h1'>{t('blog-welcome-text')}</Typography>

            </Box>
            <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-evenly'}>
                
                {props.map( post => (
                    <>
                    <BlogCard post={post}/>
                    </>
                ))}
            </Box>
        </Box>
    )
}

export default BlogMainPage