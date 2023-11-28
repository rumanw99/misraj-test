// components/Login.tsx
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Simulate successful login
      localStorage.setItem('accessToken', 'mockAccessToken');
      localStorage.setItem('userId', 'mockUserId');
      navigate('/dashboard'); // Use navigate instead of history.push
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h2" align="center">
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
