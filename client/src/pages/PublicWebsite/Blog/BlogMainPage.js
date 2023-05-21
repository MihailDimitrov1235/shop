import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, TextField, Button, Pagination, Card, FormControlLabel, RadioGroup, Radio, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BlogCard from '../../../components/blog/BlogCard';
import blogService from '../../../services/blog';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

const categories = [
    {id:1, name:'chemestry'},
    {id:2, name:'chemestry'},
    {id:3, name:'chemestry'},
    {id:4, name:'chemestry'},
    {id:5, name:'chemestry'},
    {id:6, name:'chemestry'},
]

const BlogMainPage = () =>{
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const defaultCategory = searchParams.get('category');

    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);

    const [checkedCategories,setCheckedCategories] = useState(new Set([parseInt(defaultCategory)]));
    const [sortBy, setSortBy] = useState('none');

    const searchRef = useRef('');
    const [filters, setFilters] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        get()
    }, [i18n.language, page])

    const get = () => {
        const pagination = {
            page: page || 1,
            total: 10
        }

        blogService.getPosts(pagination, [], {}, i18n.language)
        .then((res) => {
            setPosts(res.data.data);
            setTotal(res.data.total);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleSearch = () =>{
        console.log(searchRef.current.value)
    }

    const handlePageChange = (event, page) => {
        setPage(page);
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
    
    return (
        <Container>
            <Box
                sx = {{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                    width:'40%',
                    mx: 'auto',
                    my: 4,
                    textAlign:'center'
                }}
            >
                <Typography variant='h1' sx={{ mb:4 }}>{t('blog-welcome-title')}</Typography>
                <Typography variant='subtitle1'>{t('blog-welcome-subtitle')}</Typography>
            </Box>
            <Box sx = {{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <TextField inputRef={searchRef} color='bordoRed' sx={{ width:'30%' }} label={t('search')}/>
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
            {filters && 
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
                {posts.map((post, index) => <BlogCard post={post} key={index}/>)}
            </Box>
            <Box display={'flex'} justifyContent={'center'} sx={{
                mt:3
            }}>
                <Pagination
                    page={page}
                    count={Math.ceil(total / 10) || 1} 
                    size='large' 
                    variant='outlined' 
                    onChange={handlePageChange}
                />
            </Box>
        </Container>
    )
}

export default BlogMainPage