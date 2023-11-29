import { Box, Container, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { AppBar } from '../components/Header';
import CustomDrawer from '../components/Drawer';

function DashboardLayout({ children }: PropsWithChildren) {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const [drawer, setDrawer] = useState(matches);

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    return (
        <Box display="flex">
            <AppBar open={drawer} toggleDrawer={toggleDrawer} />
            <CustomDrawer open={drawer} toggleDrawer={toggleDrawer} />
            <Container
                maxWidth={false}
                sx={{
                    flexGrow: 1,
                    mt: '32px',
                    marginLeft: !drawer ? `-280px` : `0px`,
					...!matches && {
						marginLeft : "0px",
					} 
                }}
            >
                <Toolbar />
                {children}
            </Container>
        </Box>
    );
}

export default DashboardLayout;
