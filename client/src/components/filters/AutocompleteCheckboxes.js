import {
    Checkbox,
    TextField,
    Autocomplete,
    Chip
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTranslation } from 'react-i18next'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteCheckboxes = ({ label, options, setValue }) => {
    const { t } = useTranslation();

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        color='bordoRed'
                    />
                    {option.title}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={label} color='bordoRed' />
            )}
            renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => (
                    <Chip {...getTagProps({ index })} label={option.title} sx={{ width: '100%', justifyContent: 'space-between', px: 4 }}/>
                ))
            }}
            noOptionsText={t('no-options')}
        />
    );
}

export default AutocompleteCheckboxes;