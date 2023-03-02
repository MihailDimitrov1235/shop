import { useState, useEffect } from 'react';
import { Card, Container, Grid, Box } from '@mui/material';
import ProductCard from './ProductCard';
import productService from '../../../services/product';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Pagination from '../../Pagination/Pagination';
import Select from '../../filters/Select';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [sort, setSort] = useState('desc');
    const { i18n } = useTranslation();

    const options = [
        { label: 'Първо по-новите', value: 'desc' },
        { label: 'Първо по-старите', value: 'asc' }
    ]

    useEffect(() => {
        const pagination = {
            page: 1,
            total: 10
        }

        productService.getProducts(pagination, [], {}, i18n.language)
            .then((res) => {
                setProducts(res.data.data);
                //setTotal(res.data.total);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <Card style={{
            paddingBottom:'20px',
        }}
        elevation={3}
        >
            <Box sx={{ display: 'flex', px: '30px', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 2 }}>
                    <TextField
                        label='Search'
                        margin='normal'
                        variant='standard'
                        color='bordoRed'
                    />
                </Box>
                <Box sx={{ width: '30%' }}>
                    <Select
                        title='Сортиране'
                        options={options}
                        setValue={setSort}
                    />
                </Box>
            </Box>

            <Container maxWidth={'false'} sx={{ mt: 3 }}>
                <Grid container spacing={2} >
                    {products.map((product, index) => (
                        <Grid item sm={12} md={6} lg={4} key={index}>
                            <ProductCard product={product}/>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    total={100}
                    page={page}
                    setPage={setPage}
                    rows={rows}
                    setRows={setRows}
                />
            </Container>
        </Card>
    );
}

export default ProductList;