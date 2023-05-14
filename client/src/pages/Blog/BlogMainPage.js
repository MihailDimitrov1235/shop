import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, TextField, Button, Pagination, Card, FormControlLabel, RadioGroup, Radio, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BlogCard from '../../components/blog/BlogCard';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

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

const categories = [
    {id:1, name:'chemestry'},
    {id:2, name:'chemestry'},
    {id:3, name:'chemestry'},
    {id:4, name:'chemestry'},
    {id:5, name:'chemestry'},
    {id:6, name:'chemestry'},
]



const BlogMainPage = () =>{

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const defaultCategory = searchParams.get('category');

    const [checkedCategories,setCheckedCategories] = useState(new Set([parseInt(defaultCategory)]))
    const [sortBy, setSortBy] = useState('none')

    const searchRef = useRef('')
    const [filters, setFilters] = useState(false)

    const handleSearch = () =>{
        console.log(searchRef.current.value)
    }

    const handlePageChange = (event, page) => {
        console.log(page);
      };
    
    const handleCheckedCategoriesChange = (event) => {
        let newChecked = new Set([...checkedCategories])
        if(event.target.checked){
            newChecked.add(parseInt(event.target.id))
        }else{
            newChecked.delete(parseInt(event.target.id))
        }
        setCheckedCategories(newChecked)
        console.log(newChecked)
    }

    const handleSortByChange = (event) =>{
        setSortBy(event.target.value)
    }

    const { t } = useTranslation();
    return (
        <Container>
            <Box
                sx = {{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                }}
            >
                <Typography variant='h1'>{t('blog-welcome-title')}</Typography>
                <Typography variant='subtitle1'>{t('blog-welcome-subtitle')}</Typography>
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
                <Button onClick={ () => setFilters(!filters)} sx={{ 
                    height:'55px',
                    ml: 5,
                    color:'black',
                    border:'solid 1px #96011c',
                }}>
                    {t('filters')} <TuneIcon/>
                </Button>
            </Box>
            { filters && 
            <Card sx={{mt:3, p:2}}>
                <Typography variant='h5'>{t('sort-by')}</Typography>
                <RadioGroup
                    defaultValue={sortBy}
                    onChange={handleSortByChange}
                    sx={{
                        display:'flex',
                        flexDirection:'row',
                    }}
                >
                    <FormControlLabel value="none" control={<Radio color='bordoRed' />} label={t('dont-sort')} />
                    <FormControlLabel value="most-visited" control={<Radio color='bordoRed' />} label={t('most-visited')} />
                    <FormControlLabel value="newest" control={<Radio color='bordoRed' />} label={t("newest")} />
                    <FormControlLabel value="oldest" control={<Radio color='bordoRed' />} label={t("oldest")} />
                </RadioGroup>
                <Typography variant='h5'>{t('categories')}</Typography>
                <Box display={'flex'}>
                        {categories.map(category => (
                            <FormControlLabel control={<Checkbox checked={checkedCategories.has(category.id)} id={category.id} color={'bordoRed'} onChange={handleCheckedCategoriesChange} />} label={category.name}/>
                        ))}
                </Box>
            </Card>
            }
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
                    onChange={handlePageChange}
                />
            </Box>
        </Container>
    )
}

export default BlogMainPage