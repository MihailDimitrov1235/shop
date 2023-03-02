import {
    Container,
    CardContent,
    CardActions,
    Button,
    Typography
} from '@mui/material';
import CheckboxesTags from '../../../filters/AutocompleteCheckboxes';

const FilterCard = (props) => {
    const { component: FilterContent } = props;

    return (
        <Container sx={{ minWidth: 275, mb: 2, width: '100%' }}>
            <CardContent>
                {FilterContent}
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Container>
    );
}

export default FilterCard;