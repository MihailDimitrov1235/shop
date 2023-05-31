import FormBuilder from "../../FormBuilder";
import * as Yup from 'yup';
import userService from '../../../services/user';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import useAuth from '../../../hooks/useAuth';

const UserForm = () => {
    const { setUser } = useAuth();
    const { t } = useTranslation();
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
        password: Yup.string().max(255).required(t('password-required')).min(8, t('password-invalid')),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], t('passwords-not-match')),
    });

    const onSubmit = (values, { setSubmitting }) => {
        userService.register(values)
            .then((res) => {
                localStorage.setItem('refresh-token', res.data.token);
                const user = res.data.user;
                setUser(user);
                router.push('/');
            })
            .catch((err) => {
                setSubmitting(false);
            })
    };

    const fields = [
        { type: 'text', name: 'name', label: t('name') },
        { type: 'email', name: 'email', label: t('email') },
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

export default UserForm;