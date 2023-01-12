import { useState } from 'react';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    Tab,
    Tabs
} from '@mui/material';
import PropTypes from 'prop-types';
import Fields from './Fields';
import TabPanel from './TabPanel';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const FormBuilder = ({ fields, initialValues = {}, menus, validationSchema, onSubmit, submitButton, enableReinitialize = false }) => {
    const [selectedMenu, setSelectedMenu] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedMenu(newValue);
    };

    if (Object.keys(initialValues).length === 0) {
        if(Array.isArray(fields)) {
            fields.forEach((field) => {
                initialValues[field.name] = '';
            });
        }else {
            for(let key in fields) {
                fields[key].forEach((field) => {
                    initialValues[field.name] = '';
                });
            }
        }
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
                    {menus && menus.length > 0 ? (
                        <Box sx={{
                            flexGrow: 1,
                            bgcolor: "",
                            display: "flex",

                        }}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={selectedMenu}
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
                                {menus.map((menu, index) => (
                                    <Tab label={menu.label} {...a11yProps(index)} key={index}/>
                                ))}
                            </Tabs>

                            {menus.map((menu, index) => (
                                <TabPanel value={selectedMenu} index={index} key={index}>
                                    {fields[menu.id].map((field, index) => {

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

                                        return <Fields field={field} baseProps={baseProps} setFieldValue={setFieldValue} key={index} />
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
                            ))}
                        </Box>
                    ) : (
                        <>
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

                                return <Fields field={field} baseProps={baseProps} setFieldValue={setFieldValue} key={index} />
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
                        </>
                    )}
                </form>
            )}
        </Formik >
    );
}

FormBuilder.propTypes = {
    fields: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired,
    initialValues: PropTypes.object,
    menus: PropTypes.array,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    submitButton: PropTypes.object,
    enableReinitialize: PropTypes.bool
};

export default FormBuilder;