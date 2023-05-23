import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, TextField, Button, Pagination, Card, FormControlLabel, RadioGroup, Radio, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BlogCard from '../../../components/blog/BlogCard';
import blogService from '../../../services/blog';
import categoryService from '../../../services/category';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ClearIcon from '@mui/icons-material/Clear';
import ArticleIcon from '@mui/icons-material/Article';

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

    const [categories, setCategories] = useState([]);

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

        categoryService.getAll(i18n.language)
            .then((res) => {
                const options = res.data.map((el) => ({ label: el.name, value: el.id }));
                setCategories(options);
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
                <Box display={'flex'} flexWrap={'wrap'}>
                        {categories.map(category => (
                            <FormControlLabel control={<Checkbox checked={checkedCategories.has(category.value)} id={category.value} color={'bordoRed'} onChange={handleCheckedCategoriesChange} />} label={category.label}/>
                        ))}
                </Box>
            </Card>
            }
            
            {posts.length > 0? 
            <>
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
                </>
            :
                <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', p:10 }}>
                    <svg width={0} height={0}>
                        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                            <stop offset={0} stopColor="rgba(219,18,41,1)" />
                            <stop offset={1} stopColor="rgba(150,1,28,1)" />
                        </linearGradient>
                    </svg>
                    <Box position={'relative'}>
                        <ArticleIcon sx={{ fontSize:'250px', mb:5, fill: "url(#linearColors)" }} />
                        <ClearIcon sx={{ borderRadius:'50%', background:'#f4f6f8', position:'absolute', bottom:'10px' , right:'5px', fontSize:'67px', mb:5, fill: "url(#linearColors)" }}></ClearIcon>
                    </Box>

                    <Typography sx={{ mb:4 }} textAlign={'center'} variant='h2'>{t('no-posts')}</Typography>
                    <Typography textAlign={'center'} variant='heroSubtitle'>{t('no-posts-subtitle')}</Typography>
                </Box>
            }
        </Container>
    )
}

export default BlogMainPage