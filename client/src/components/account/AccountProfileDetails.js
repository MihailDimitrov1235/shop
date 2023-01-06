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

const AccountProfileDetails = (props) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const initialValues = {
        name: user && user.name,
        email: user && user.email
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required'))
    });

    const onSubmit = (values, { setSubmitting }) => {
       
    };

    const fields = [
        { type: 'text', name: 'name', label: t('name') },
        { type: 'email', name: 'email', label: t('email') },
       //{ type: 'divider' }
    ];

    const submitButton = {
        label: t('save'),
        color: 'bordoRed',
        fullWidth: false
    };

    return (
            <Card>
                <CardHeader
                    subheader={t('profile-edit-information')}
                    title={t('profile')}
                />
                <Divider />
                <CardContent>
                    <FormBuilder
                        fields={fields}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        submitButton={submitButton}
                    />
                    {/* <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="First name"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={values.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Last name"
                                name="lastName"
                                onChange={handleChange}
                                required
                                value={values.lastName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                onChange={handleChange}
                                type="number"
                                value={values.phone}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                onChange={handleChange}
                                required
                                value={values.country}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Select State"
                                name="state"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.state}
                                variant="outlined"
                            >
                                {states.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid> */}
                </CardContent>
                {/* <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="bordoRed"
                        variant="contained"
                    >
                        Save details
                    </Button>
                </Box> */}
            </Card>
    );
};

export default AccountProfileDetails;