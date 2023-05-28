import {
    FormControl,
    InputLabel,
    Select as SelectMUI,
    MenuItem,
    TextField
} from '@mui/material';
import PropTypes from 'prop-types';

const Select = ({ title, options, value, setValue, ...others }) => {

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        // <FormControl fullWidth>
        //     <InputLabel id="label" color='bordoRed'>{title}</InputLabel>
        //     <SelectMUI
        //         labelId="label"
        //         value={value}
        //         label={title}
        //         onChange={handleChange}
        //         sx={{ backgroundColor: 'white' }}
        //         color='bordoRed'
        //     >
        //         {options.map((option, index) => (
        //             <MenuItem value={option.value} key={index}>{option.label}</MenuItem>
        //         ))}
        //     </SelectMUI>
        // </FormControl>
        <TextField
            select
            label={title}
            value={value}
            color='bordoRed'
            variant={others.variant || 'standard'}
            fullWidth
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

Select.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    setValue: PropTypes.func.isRequired
}

export default Select;