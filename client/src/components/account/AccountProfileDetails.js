import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import FormBuilder from '../FormBuilder';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { Formik } from 'formik';

const AccountProfileDetails = (props) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const initialValues = {
        name: user ? user.name : '',
        email: user ? user.email : ''
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required(t('name-required')),
                email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required'))
            })}
            onSubmit={(values, { setSubmitting }) => {
            }}
            enableReinitialize
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
                    <Card>
                        <CardHeader
                            subheader='Информацията може да бъде редактирана'
                            title='Профил'
                        />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        label='Име'
                                        name='name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        variant='outlined'
                                        color='bordoRed'
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label='Имейл'
                                        name='email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        variant='outlined'
                                        color='bordoRed'
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: 2,
                                p: 2
                            }}
                        >
                            <Button
                                color='bordoRed'
                                variant='contained'
                                type='submit'
                            >
                                Запази
                            </Button>
                        </Box>
                    </Card>
                </form>
            )}
        </Formik>
    );
};

export default AccountProfileDetails;