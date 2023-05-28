import { Box, Typography } from '@mui/material';
import { FieldArray } from 'formik';
import ArrayItem from './ArrayItem';

const ArrayField = ({ itemLabel, fields, values, baseProps, ...otherProps }) => {
    const { name, label } = baseProps;

    return (
        <>
            <Box sx={{ mb: 1, mt: 2 }}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    {label}
                </Typography>
            </Box>

            <FieldArray
                name={name}
                render={arrayHelpers => (
                    <>
                        {values[name].map((element, index) => (
                            <ArrayItem
                                arrayHelpers={arrayHelpers}
                                name={name}
                                itemLabel={itemLabel}
                                fields={fields}
                                baseProps={baseProps}
                                index={index}
                                values={values}
                                key={index}
                                {...otherProps}
                            />
                        ))}
                    </>
                )}
            />
        </>
    );
}

export default ArrayField;