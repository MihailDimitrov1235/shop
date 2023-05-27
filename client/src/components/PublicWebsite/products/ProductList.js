import { useState, useEffect } from 'react';
import { Card, Container, Grid, Box, Typography, linearGradient } from '@mui/material';
import ProductCard from './ProductCard';
import productService from '../../../services/product';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Pagination from '../../Pagination/Pagination';
import Select from '../../filters/Select';
import BiotechIcon from '@mui/icons-material/Biotech';
import ClearIcon from '@mui/icons-material/Clear';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [sort, setSort] = useState('desc');
    const { t, i18n } = useTranslation();

    const options = [
        { label: t('sort-newest'), value: 'desc' },
        { label: t('sort-oldest'), value: 'asc' }
    ]

    useEffect(() => {
        const pagination = {
            page: 1,
            total: 10
        }

        productService.getProducts(pagination, [], {}, i18n.language)
            .then((res) => {
                setProducts(res.data.data);
                setTotal(res.data.total);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [i18n.language])

    return (
        <Card style={{
            paddingBottom:'20px',
        }}
        elevation={3}
        >
            <Box sx={{ display: 'flex', px: 4, justifyContent: 'space-between', alignItems: 'center', pt:4 }}>
                <Box sx={{ flex: 2 }}>
                    <TextField
                        sx={{ m:0 }}
                        label={t('search')}
                        margin='normal'
                        variant='outlined'
                    />
                </Box>
                <Box sx={{ flex:1 }}>
                    <Select
                        sx={{ m:0, mt:'8px' }}
                        variant='outlined'
                        title={t('sort')}
                        options={options}
                        setValue={setSort}
                    />
                </Box>
            </Box>

            <Container maxWidth={'false'} sx={{ mt: 3 }}>
                {products.length>0? 
                <>
                    <Grid container spacing={2} >
                        {products.map((product, index) => (
                            <Grid item sm={12} md={6} lg={4} key={index}>
                                <ProductCard product={product}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        total={total}
                        page={page}
                        setPage={setPage}
                        rows={rows}
                        setRows={setRows}
                    />
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
                            <BiotechIcon sx={{ fontSize:'250px', mb:5, fill: "url(#linearColors)" }} />
                            <ClearIcon sx={{background:'white', position:'absolute', bottom:'10px' , right:'35px', fontSize:'67px', mb:5, fill: "url(#linearColors)" }}></ClearIcon>
                        </Box>

                        <Typography sx={{ mb:4 }} textAlign={'center'} variant='h2'>{t('no-products')}</Typography>
                        <Typography textAlign={'center'} variant='heroSubtitle'>{t('no-products-subtitle')}</Typography>
                    </Box>
                }
                
            </Container>
        </Card>
    );
}

export default ProductList;