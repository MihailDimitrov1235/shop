import { useState } from 'react';
import {
    Box,
    ListItemButton,
    ListItemText,
    Fab,
    Collapse
} from '@mui/material';
import { styled } from '@mui/styles';
import { getIn } from 'formik';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Fields from '../index';

const ExpandWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)'
});

const ExpandButton = styled(ListItemButton)({
    paddingLeft: 0,
    paddingTop: '10px',
    paddingBottom: '10px',
    marginLeft: 0,
    '&:hover': {
        backgroundColor: 'transparent',
    }
});

const ControlsWrapper = styled(Box)({
    padding: '10px 0'
});


const ArrayItem = ({
    arrayHelpers,
    name,
    itemLabel,
    fields,
    baseProps,
    index,
    values,
    ...otherProps
}) => {
    const [open, setOpen] = useState(true);

    const dataScheme = () => {
        let scheme = {};

        Object.keys(values[name][0]).forEach((key) => {
            scheme[key] = '';
        });

        return scheme;
    }

    const onAdd = () => {
        arrayHelpers.push(dataScheme());
    }

    const onRemove = (index) => {
        arrayHelpers.remove(index);
    }

    return (
        <Box>
            <ExpandWrapper>
                <ExpandButton sx={{ ml: 2, mb: !open ? 2 : 0 }} onClick={() => setOpen(!open)}>
                    {!open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    <ListItemText primary={itemLabel} />

                </ExpandButton>
                <ControlsWrapper sx={{ mb: !open ? 2 : 0 }}>
                    <Fab onClick={() => onAdd()} size='small' color='primary' aria-label='add'>
                        <AddIcon />
                    </Fab>
                    <Fab onClick={() => onRemove(index)} disabled={values[name].length == 1} sx={{ ml: 1 }} size='small' color='primary' aria-label='remove'>
                        <RemoveIcon />
                    </Fab>
                </ControlsWrapper>
            </ExpandWrapper>

            <Collapse in={open}>
                {fields.map((field, i) => {
                    const fieldName = name + '.' + index + '.' + field.name;

                    const props = {
                        ...baseProps,
                        label: field.label,
                        name: fieldName,
                        fullWidth: Object.hasOwn(field, 'fullWidth') ? field.fullWidth : true,
                        error: Boolean(
                            getIn(otherProps.touched, fieldName) &&
                            getIn(otherProps.errors, fieldName)
                        ),
                        margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                        value: values[name][index][field.name],
                        variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                        helperText: getIn(otherProps.touched, fieldName) && getIn(otherProps.errors, fieldName),
                        key: i,
                        color: 'bordoRed',
                    };

                    return (
                        <Fields
                            field={field}
                            baseProps={props}
                            key={field.name}
                            values={values}
                            touched={otherProps.touched}
                            errors={otherProps.errors}
                            setFieldValue={otherProps.setFieldValue}
                        />
                    );
                })}
            </Collapse>
        </Box>
    );
}

export default ArrayItem;