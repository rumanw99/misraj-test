// components/Login.tsx
import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { WhiteLogo } from '../../components/WhiteLogo';
import LoginForm from './components/LoginForm';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        localStorage.setItem('accessToken', 'mockAccessToken');
        localStorage.setItem('userId', 'mockUserId');
        navigate('/dashboard');
    };

    React.useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                justifyContent: 'right',
                display: 'flex',
                background:
                    'linear-gradient(90deg, rgba(51, 153, 255, 1) 0%, rgba(153, 204, 255, 1) 100%)',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '30px',
                    left: '30px',
                    color: {
                        xs: '#47A3FF',
                        md: 'white',
                    },
                    fill: {
                        xs: '#47A3FF',
                        md: 'white',
                    },
                }}
            >
                <Grid
                    item
                    sx={{
                        flexShrink: 0,
                        width: '28.75px',
                        height: '45.75px',
                        position: 'relative',
                        overflow: 'hidden',
                        fill: 'inherit',
                    }}
                >
                    <WhiteLogo />
                </Grid>
                <Grid item sx={{ color: 'inherit' }}>
                    <Typography
                        sx={{
                            color: 'inherit',
                            textAlign: 'left',
                            fontWeight: 600,
                            fontSize: '24px',
                            fontFamily: 'Poppins-SemiBold, sans-serif',
                            position: 'relative',
                        }}
                    >
                        Socialha
                    </Typography>
                </Grid>
            </Box>
            <Box
                sx={{
                    width: '541px',
                    height: '100%',
                    position: 'absolute',
                    left: '0px',
                    top: '70px',
                    paddingTop: '32px',
                    paddingLeft: '49px',
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                }}
            >
                <Box
                    mt={2}
                    sx={{
                        zIndex: 99,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        sx={{
                            position: 'absolute',
                            left: '-30px',
                            fontSize: '40px',
                            fontFamily: 'Poppins',
                            fontWeight: '700',
                            color: '#5179A0',
                            textShadow: `1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff,
                            1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff`,
                        }}
                    >
                        Empowering Connections
                    </Typography>

                    <Typography
                        mt={8}
                        sx={{
                            position: 'absolute',
                            right: '0',
                            fontSize: '40px',
                            fontFamily: 'Poppins',
                            fontWeight: '700',
                            color: '#5179A0',
                            textShadow: `1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff,
                            1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff`,
                        }}
                    >
                        Inspiring Moments
                    </Typography>
                </Box>

                <Box
                    component={'img'}
                    src="/public/images/Frame.png"
                    height={'30%'}
                    position={'absolute'}
                    left={'50%'}
                    top={'34%'}
                    zIndex={99}
                ></Box>
                <Box
                    component={'img'}
                    src="/public/images/Frame1.png"
                    height={'30%'}
                    position={'absolute'}
                    left={'15%'}
                    bottom={'12%'}
                    zIndex={99}
                ></Box>
            </Box>

            <Box
                sx={{
                    background: '#ffffff',
                    borderRadius: '40px',
                    width: {
                        xs: '100%',
                        md: '70%',
                    },
                    height: '100%',
                    right: '0px',
                    top: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <LoginForm onSubmit={handleSubmit} />
            </Box>
        </Box>
    );
};

export default Login;
