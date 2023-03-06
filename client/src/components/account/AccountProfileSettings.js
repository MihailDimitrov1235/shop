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

const AccountProfileSettings = (props) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const initialValues = {
        oldPassword: '',
        password: '',
        repeatPassword: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                oldPassword: Yup.string().max(255).required('Старата паролата е задължителна'),
                password: Yup.string().max(255).required('Новата паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа').when('oldPassword', (oldPassword, schema) => {
                    if (oldPassword) {
                        return schema.test({
                            test: newPassword => newPassword !== oldPassword,
                            message: 'Новата парола трябва да е различна от старата'
                        })
                    }
                }),
                repeatPassword: Yup.string().max(255).required('Повтоерете новата паролата е задължително').when('password', (password, schema) => {
                    if (password) {
                        return schema.test({
                            test: repeatPassword => repeatPassword === password,
                            message: 'Паролите не съвпадат'
                        })
                    }
                })
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
                <form onSubmit={handleSubmit} style={{ height: '100%' }}>
                    <Card sx={{ height: '100%' }}>
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
                                        error={Boolean(touched.oldPassword && errors.oldPassword)}
                                        fullWidth
                                        helperText={touched.oldPassword && errors.oldPassword}
                                        label='Стара парола'
                                        name='oldPassword'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type='password'
                                        value={values.oldPassword}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        label='Нова парола'
                                        name='password'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type='password'
                                        value={values.password}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.repeatPassword && errors.repeatPassword)}
                                        fullWidth
                                        helperText={touched.repeatPassword && errors.repeatPassword}
                                        label='Повтори новата парола'
                                        name='repeatPassword'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type='password'
                                        value={values.repeatPassword}
                                        variant='outlined'
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

export default AccountProfileSettings;