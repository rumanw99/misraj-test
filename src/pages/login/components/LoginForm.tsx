// components/LoginForm.tsx
import React from 'react';
import {
    Typography,
    Stack,
    Button,
    Box,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FilledInput } from '../../../components/FilledInput';
import { FileIcon } from '../../../components/icons/FileIcon';
import { SecurityIcon } from '../../../components/icons/SecurityIcon';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC<{
    onSubmit: () => void;
}> = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <Box width="445px">
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#121212',
                        fontSize: 32,
                        fontFamily: 'Poppins',
                        fontWeight: '700',
                        wordWrap: 'break-word',
                    }}
                >
                    Welcome to Socialha 👋🏼
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        mt: 3,
                        color: '#121212',
                        fontSize: 20,
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        wordWrap: 'break-word',
                    }}
                >
                    Please enter your information below
                </Typography>
            </Box>
            <form
                onSubmit={formik.handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '24px',
                    marginTop: '36px',
                }}
            >
                <FilledInput
                    InputProps={{
                        startAdornment: <FileIcon />,
                    }}
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Please enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <FilledInput
                    fullWidth
                    InputProps={{
                        startAdornment: <SecurityIcon />,
                    }}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Please enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height="30px"
                >
                    <FormControlLabel
                        label="Remeber me"
                        control={<Checkbox />}
                    />
                    <Button
                        variant="text"
                        sx={{
                            color: '#0080FF',
                            fontSize: 18,
                            fontWeight: '400',
                        }}
                    >
                        Forget password
                    </Button>
                </Stack>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
                <Typography height="20px" textAlign="center">
                    <Typography
                        component="span"
                        sx={{
                            color: 'rgba(0, 0, 0, 0.88)',
                            fontSize: 18,
                            fontWeight: 400,
                        }}
                    >
                        Don’t you have an account?{' '}
                    </Typography>
                    <Box
                        component="span"
                        sx={{
                            color: '#0080FF',
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        Sign up
                    </Box>
                </Typography>
            </form>
        </Box>
    );
};

export default LoginForm;
