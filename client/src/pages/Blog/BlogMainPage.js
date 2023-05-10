import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BlogCard from '../../components/blog/BlogCard';

const props = [
    {title: 'Some Title', categories:[1,5,6,2], slug:'some-slug', userId: 1, image:'https://wallpapersmug.com/download/1366x768/da1c36/windows-11-blue-violet-structure-microsoft-stock.jpeg'},
    {title: 'Some Title', categories:[1,5,6,2], slug:'some-slug', userId: 1, image:'https://wallpapersmug.com/download/1366x768/da1c36/windows-11-blue-violet-structure-microsoft-stock.jpeg'},
    {title: 'Some Title', categories:[1,5,6,2], slug:'some-slug', userId: 1, image:'https://wallpapersmug.com/download/1366x768/da1c36/windows-11-blue-violet-structure-microsoft-stock.jpeg'},
    {title: 'Some Title', categories:[1,5,6,2], slug:'some-slug', userId: 1, image:'https://wallpapersmug.com/download/1366x768/da1c36/windows-11-blue-violet-structure-microsoft-stock.jpeg'},
    {title: 'Some Title', categories:[1,5,6,2], slug:'some-slug', userId: 1, image:'https://wallpapersmug.com/download/1366x768/da1c36/windows-11-blue-violet-structure-microsoft-stock.jpeg'},
]

const BlogMainPage = () =>{
    const { t } = useTranslation();
    return (
        <Container>
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
        </Container>
    )
}

export default BlogMainPage