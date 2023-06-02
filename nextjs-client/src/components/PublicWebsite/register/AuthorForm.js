import FormBuilder from "../../FormBuilder";
import * as Yup from 'yup';
import userService from '../../../services/user';
import { useTranslation } from 'next-i18next';

const AuthorForm = () => {
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
        password: Yup.string().max(255).required(t('password-required')).min(8, t('password-invalid')),
        phone: Yup.string().required(t('phone-required')),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], t('passwords-not-match')),
    });

    const onSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
        // userService.register(values)
        //     .then((res) => {
        //         const user = res.data.user;
        //         navigate('/', { replace: true });
        //     })
        //     .catch((err) => {
        //         setSubmitting(false);
        //     })
    };

    const fields = [
        { type: 'text', name: 'name', label: t('name') },
        { type: 'email', name: 'email', label: t('email') },
        { type: 'text', name: 'phone', label: t('phone') },
        { type: 'password', name: 'password', label: t('password') },
        { type: 'password', name: 'repeatPassword', label: t('repeat-password') }
    ];

    const submitButton = {
        label: t('sign-up'),
        color: 'bordoRed'
    };

    return (
        <FormBuilder
            fields={fields}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButton={submitButton}
        />
    );
}

export default AuthorForm;