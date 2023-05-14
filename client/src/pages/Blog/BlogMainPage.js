import { useRef } from 'react';
import { Box, Typography, Container, TextField, Button, Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BlogCard from '../../components/blog/BlogCard';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    pagination: {
      '& .MuiPaginationItem-root': {
        color: 'black', 
        '&.Mui-selected': {
          color: 'white', 
          backgroundColor: '#96011c', 
          '&:hover': {
            backgroundColor: '#96011c', 
          },
        },
        '&:hover': {
          backgroundColor: '#96011c', 
          color: 'white', 
        },
      },
      '& .MuiPaginationItem-ellipsis':{
        '&:hover': {
            backgroundColor: 'transparent !important', 
            color: 'inherit !important', 
          },
      }
    },
  }));  

const props = {
    pages: 10,
    posts:[
        {date: '2022-05-03', categories:['politics', 'chemistry'], description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author:'John Lennon', title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
        {date: '2022-05-03', categories:['politics', 'chemistry'], description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author:'John Lennon', title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
        {date: '2022-05-03', categories:['politics', 'chemistry'], description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author:'John Lennon', title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
        {date: '2022-05-03', categories:['politics', 'chemistry'], description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author:'John Lennon', title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
        {date: '2022-05-03', categories:['politics', 'chemistry'], description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author:'John Lennon', title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet', slug:'some-slug', userId: 1, image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg'},
    ]
}

const BlogMainPage = () =>{

    const classes = useStyles();

    const searchRef = useRef('')

    const handleSearch = () =>{
        console.log(searchRef.current.value)
    }

    const handlePageChange = (event, page) => {
        console.log(page);
      };

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
                <TextField inputRef={searchRef} sx={{ width:'30%' }} label={t('search')}/>
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
                
                {props.posts.map( post => (
                    <>
                    <BlogCard post={post}/>
                    </>
                ))}
            </Box>
            <Box display={'flex'} justifyContent={'center'} sx={{
                mt:3
            }}>
                <Pagination count={props.pages} 
                    size='large' 
                    variant='outlined' 
                    classes={{ root: classes.pagination }}
                    onChange={handlePageChange}
                />
            </Box>
        </Container>
    )
}

export default BlogMainPage