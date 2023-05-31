import {
    Checkbox,
    TextField,
    Autocomplete,
    Chip
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTranslation } from 'next-i18next'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteCheckboxes = ({ label, options, setValue}) => {
    const { t } = useTranslation();

    return (
        <Autocomplete
            multiple
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        color='bordoRed'
                    />
                    {option.label}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={label} color='bordoRed' />
            )}
            // renderTags={(tagValue, getTagProps) => {
            //     return tagValue.map((option, index) => (
            //         <Chip {...getTagProps({ index })} label={option.title} sx={{ justifyContent: 'space-between', px: 4 }}/>
            //     ))
            // }}
            noOptionsText={t('no-options')}
        />
    );
}

export default AutocompleteCheckboxes;