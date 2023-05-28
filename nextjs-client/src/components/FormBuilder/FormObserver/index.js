import { useEffect } from 'react';
import { useFormikContext } from 'formik';

const FormObserver = ({ handleOnChange }) => {
    const { values } = useFormikContext();

    useEffect(() => {
        handleOnChange(values);
    }, [values]);

    return null;
};

export default FormObserver;