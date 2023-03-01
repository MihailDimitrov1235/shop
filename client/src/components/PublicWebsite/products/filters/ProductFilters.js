import { Card, Typography } from '@mui/material';
import FilterCard from './FilterCard';

const ProductFilters = () => {
    //nau4na oblast
    //vip razrabotka - dezertaciq, monografiq, doklad, statiq, obzor
    //ezik na razrabotkata
    //klu4ovi dumi

    return (
        <Card style={{
            paddingTop:'40px',
        }}
        elevation={3}
        >
            <Typography variant='h3' style={{textAlign:'center'}}>t('filters')</Typography>
            <FilterCard />
            <FilterCard />
            <FilterCard />
        </Card>
    );
}

export default ProductFilters;