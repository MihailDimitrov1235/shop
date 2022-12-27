import { Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    TextField,
    MenuItem,
    Autocomplete
} from '@mui/material';
import PropTypes from 'prop-types';

const FormBuilder = ({ fields, initialValues, validationSchema, onSubmit, submitButton }) => {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values
            }) => (
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => {

                        const baseProps = {
                            label: field.label,
                            name: field.name,
                            onBlur: handleBlur,
                            onChange: handleChange,
                            fullWidth: Object.hasOwn(field, 'fullWidth') ? field.fullWidth : true,
                            error: Boolean(touched[field.name] && errors[field.name]),
                            margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                            value: values[field.name],
                            variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                            helperText: touched[field.name] && errors[field.name],
                            key: index,
                            color: 'bordoRed'
                        };

                        if (field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number') {
                            return (
                                <TextField
                                    type={field.type}
                                    {...baseProps}
                                />
                            );
                        } else if (field.type === 'multiline') {
                            return (
                                <TextField
                                    rows={field.rows || 2}
                                    multiline
                                    {...baseProps}
                                />
                            );
                        } else if (field.type === 'select') {
                            return (
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
                            );
                        } else if (field.type === 'autocomplete') {
                            return (
                                <Autocomplete
                                    multiple={Object.hasOwn(field, 'multiple') ? field.multiple : false}
                                    disablePortal
                                    options={field.options}
                                    onChange={(e, value) => (
                                        setFieldValue(field.name, value)
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            {...baseProps}
                                        />
                                    )}
                                    key={index}
                                />
                            );
                        }
                    })}

                    {/* {Boolean(touched.policy && errors.policy) && (
                        <FormHelperText error>
                            {errors.policy}
                        </FormHelperText>
                    )} */}
                    <Box sx={{ py: 2 }}>
                        <Button
                            color={submitButton && submitButton.color ? submitButton.color : 'primary'}
                            size={submitButton && submitButton.size ? submitButton.size : 'large'}
                            variant={submitButton && submitButton.variant ? submitButton.variant : 'contained'}
                            fullWidth={submitButton && Object.hasOwn(submitButton, 'fullWidth') ? submitButton.fullWidth : true}
                            disabled={isSubmitting}
                            type="submit"
                        >
                            {submitButton && submitButton.label ? submitButton.label : 'Добавяне'}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

FormBuilder.propTypes = {
    fields: PropTypes.array.isRequired,
    initialValues: PropTypes.object,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    submitButton: PropTypes.object
};

export default FormBuilder;