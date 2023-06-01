import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "@/components/FormBuilder";
import * as Yup from 'yup';
import adminService from '@/services/admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useMessage from '@/hooks/useMessage';
import { useRouter } from 'next/router';

const AddUserForm = () => {
    const { t } = useTranslation();
    const { addMessage } = useMessage();
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
        password: Yup.string().max(255).required(t('password-required')).min(8, t('password-invalid')),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], t('passwords-not-match')),
    });

    const onSubmit = (values, { setSubmitting }) => {
        adminService.createAdmin(values)
            .then((res) => {
                addMessage(t('user-created'), 'success');
                router.push('/admin/admins');
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    addMessage(t(error.response.data.errors[0]), 'error');
                }

                setSubmitting(false)
            })
    };

    const fields = [
        { type: 'text', name: 'name', label: t('name') },
        { type: 'email', name: 'email', label: t('email') },
        { type: 'password', name: 'password', label: t('password') },
        { type: 'password', name: 'repeatPassword', label: t('repeat-password') }
    ];

    const submitButton = {
        color: 'bordoRed'
    };

    return (
        <>
            <Helmet>
                <title>{t('admins-create')} | {t('ban')}</title>
            </Helmet>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <FormBuilder
                            fields={fields}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            submitButton={submitButton}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>
        </>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

export default AddUserForm;