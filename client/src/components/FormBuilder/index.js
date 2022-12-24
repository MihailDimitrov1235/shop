import { Formik } from 'formik';
import { 
    Box,
    Button,
    Checkbox,
    FormHelperText,
    TextField
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
                isSubmitting,
                touched,
                values
            }) => (
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => {
                        if(field.type === 'text' || field.type === 'email' || field.type === 'password') {
                            return (
                                <TextField
                                    type={field.type}
                                    error={Boolean(touched[field.name] && errors[field.name])}
                                    fullWidth={Object.hasOwn(field, 'fullWidth') ? field.fullWidth : true}
                                    helperText={touched[field.name] && errors[field.name]}
                                    label={field.label}
                                    margin={Object.hasOwn(field, 'margin') ? field.margin : 'normal'}
                                    name={field.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values[field.name]}
                                    variant={Object.hasOwn(field, 'variant') ? field.variant : 'outlined'}
                                    key={index}
                                    color="bordoRed"
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
                            {submitButton ? submitButton.label : 'Добавяне'}
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