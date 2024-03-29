import {
    TextField,
    Autocomplete,
    MenuItem,
    Divider
} from '@mui/material';
import RichText from './RichTextEditor';
import LangFields from './LangFields';
import FileUpload from './FileUpload';
import ArrayField from './ArrayField';
import PropTypes from 'prop-types';

const Fields = ({ field, baseProps, setFieldValue, values, touched, errors, updateUploadedFiles }) => {
    return (
        <>
            {(field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number') && (
                <TextField
                    type={field.type}
                    {...baseProps}
                />
            )}

            {field.type === 'multiline' && (
                <RichText
                    value={values}
                    setFieldValue={setFieldValue}
                    {...baseProps}
                />
            )}

            {field.type === 'rich-text' && (
                <RichText
                    setFieldValue={setFieldValue}
                    modules={field.modules || null}
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
                    value={baseProps.value || []}
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
                            onChange={() => {}}
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

            {field.type === 'upload' && (
                <FileUpload
                    accept={field.accept}
                    label={field.label}
                    multiple={field.multiple}
                    updateFilesCb={updateUploadedFiles}
                    setFieldValue={setFieldValue}
                    name={baseProps.name}
                    values={values}
                />
            )}

            {field.type === 'array' && (
                <ArrayField
                    fields={field.fields}
                    baseProps={baseProps}
                    itemLabel={field.itemLabel}
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