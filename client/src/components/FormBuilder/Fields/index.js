import {
    TextField,
    Autocomplete,
    MenuItem,
    Divider
} from '@mui/material';
import RichTextEditor from '../RichTextEditor';
import LangFields from './LangFields';
import PropTypes from 'prop-types';

const Fields = ({ field, baseProps, setFieldValue, values, touched, errors }) => {
    return (
        <>
            {(field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number') && (
                <TextField
                    type={field.type}
                    {...baseProps}
                />
            )}

            {field.type === 'multiline' && (
                <RichTextEditor
                    rows={field.rows || 2}
                    setFieldValue={setFieldValue}
                    {...baseProps}
                />
            )}

            {field.type === 'select' && (
                <TextField
                    select
                    {...baseProps}
                >
                    {field.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {field.type === 'autocomplete' && (
                <Autocomplete
                    multiple={Object.hasOwn(field, 'multiple') ? field.multiple : false}
                    disablePortal
                    options={field.options}
                    onChange={(e, value) => (
                        setFieldValue(field.name, value)
                    )}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...baseProps}
                        />
                    )}
                />
            )}

            {field.type === 'divider' && (
                <Divider sx={{ my: 1 }} />
            )}

            {field.type === 'lang' && (
                <LangFields
                    field={field}
                    baseProps={baseProps}
                    setFieldValue={setFieldValue}
                    values={values}
                    touched={touched}
                    errors={errors}
                />
            )}
        </>
    )
}

Fields.propTypes = {
    field: PropTypes.object.isRequired,
    baseProps: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func
};

export default Fields;