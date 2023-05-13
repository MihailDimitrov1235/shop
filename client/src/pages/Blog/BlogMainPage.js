import { useRef } from 'react';
import { Box, Typography, Container, TextField, FormControl, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BlogCard from '../../components/blog/BlogCard';
import SearchIcon from '@mui/icons-material/Search';

const props = [
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    {date: '2022-05-03', categories:['fast', 'hot', 'sport'], title: 'Some Title', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
]

const BlogMainPage = () =>{

    const searchRef = useRef('')

    const handleSearch = () =>{
        console.log(searchRef.current.value)
    }

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
            <Box sx = {{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <TextField inputRef={searchRef} sx={{ width:'30%' }} label='search'/>
                <Button onClick={handleSearch} sx={{
                    backgroundColor:'#96011c',
                    height:'55px',
                    ml: 5,
                    "&:hover":{
                        backgroundColor:'#96011c',
                    }
                }}>
                    <SearchIcon/>
                </Button>
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