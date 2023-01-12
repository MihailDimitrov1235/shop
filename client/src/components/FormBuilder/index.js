import { useState } from 'react';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    TextField,
    MenuItem,
    Autocomplete,
    Divider,
    Tab,
    Tabs
} from '@mui/material';
import PropTypes from 'prop-types';
import RichTextEditor from './RichTextEditor';
import TabPanel from './TabPanel';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const FormBuilder = ({ fields, initialValues = {}, validationSchema, onSubmit, submitButton, enableReinitialize = false }) => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    if(Object.keys(initialValues).length === 0) {
        fields.forEach((field) => {
            initialValues[field.name] = '';
        });
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={enableReinitialize}
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
                    <Box sx={{
                        flexGrow: 1,
                        bgcolor: "",
                        display: "flex",
                 
                    }}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleTabChange}
                            aria-label="Vertical tabs example"
                            sx={{
                                borderRight: 1,
                                borderColor: 'divider',
                                '& .MuiTabs-indicator': { backgroundColor: '#96011c!important' },
                                //'& .MuiTab-root': { color: blue[700] },
                                '& .Mui-selected': { color: '#96011c!important' },
                            }}
                        >
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                            <Tab label="Item Four" {...a11yProps(3)} />
                            <Tab label="Item Five" {...a11yProps(4)} />
                            <Tab label="Item Six" {...a11yProps(5)} />
                            <Tab label="Item Seven" {...a11yProps(6)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
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
                                        // <TextField
                                        //     rows={field.rows || 2}
                                        //     multiline
                                        //     {...baseProps}
                                        // />
                                        <RichTextEditor
                                            rows={field.rows || 2}
                                            setFieldValue={setFieldValue}
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
                                            freeSolo
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    {...baseProps}
                                                />
                                            )}
                                            key={index}
                                        />
                                    );
                                } else if (field.type === 'divider') {
                                    return <Divider key={index} sx={{ my: 1 }} />
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
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Item Four
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            Item Five
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            Item Six
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            Item Seven
                        </TabPanel>
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
    submitButton: PropTypes.object,
    enableReinitialize: PropTypes.bool
};

export default FormBuilder;