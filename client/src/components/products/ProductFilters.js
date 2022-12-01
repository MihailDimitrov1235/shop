import { Container, List, ListItem } from '@mui/material';
import FilterCard from '../filters/FilterCard';

const ProductFilters = () => {
    return (
        <Container>
            <FilterCard />
            <FilterCard />
            <FilterCard />
        </Container>
    );
}

export default ProductFilters;