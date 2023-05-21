import { useState } from 'react';
import {
    Box,
    Tabs,
    Tab
} from '@mui/material';
import { getIn } from 'formik';
import TabPanel from '../../TabPanel';
import Fields from '../index';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const LangFields = ({ field, baseProps, values, touched, errors, setFieldValue }) => {
    const [value, setValue] = useState(0);

    const langs = [
        { label: 'Български', slug: 'bg' },
        { label: 'English', slug: 'en' }
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                        borderRight: 1,
                        borderRight: 'none',
                        borderColor: 'divider',
                        '& .MuiTabs-indicator': { backgroundColor: '#96011c!important' },
                        //'& .MuiTab-root': { color: blue[700] },
                        '& .Mui-selected': { color: '#96011c!important' },
                    }}
                >
                    {langs.map((el, index) => (
                        <Tab label={el.label} {...a11yProps(index)} key={index} />
                    ))}
                </Tabs>
            </Box>
            {field.selectors.map((selector, index) => (
                <TabPanel value={value} index={index} key={index}>
                    <Box>
                        {field.fields.map((f, i) => {
                            const name = field.name + '.' + selector + '.' + f.name;

                            const props = {
                                ...baseProps,
                                label: f.label,
                                name: name,
                                fullWidth: Object.hasOwn(f, 'fullWidth') ? f.fullWidth : true,
                                error: Boolean(getIn(touched, name) && getIn(errors, name)),
                                margin: Object.hasOwn(f, 'margin') ? f.margin : 'normal',
                                value: values[field.name][selector][f.name],
                                variant: Object.hasOwn(f, 'variant') ? f.variant : 'outlined',
                                helperText: getIn(touched, name) && getIn(errors, name),
                                key: index,
                                color: 'bordoRed',
                            };

                            return (
                                <Fields 
                                    field={f}
                                    baseProps={props}
                                    key={f.name}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                />
                            );
                        })}
                    </Box>
                </TabPanel>
            ))}
        </>
    );
}

export default LangFields;