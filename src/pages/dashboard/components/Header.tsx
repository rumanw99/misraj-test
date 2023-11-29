import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    useTheme,
    useMediaQuery,
    Box,
    Badge,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import NotificationsIcon from '../../../components/icons/NottificationIcon';
import SettingIcon from '../../../components/icons/SettingIcon';
import { UserMenu } from './UserMenu';
import MenuIcon from '@mui/icons-material/Menu';

export const AppBar = ({ open, toggleDrawer }: AppBarProps) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <MuiAppBar
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: 'white',
                height: '64px',
                ...(open && {
                    width: `calc(100% - 280px)`,
                    marginLeft: `280px`,
                }),
                ...(open &&
                    matches && {
                        width: '0px',
                    }),
                boxShadow: ' 0px 2px 2px 0px rgba(0, 0, 0, 0.08);',
            }}
        >
            <Toolbar>
                {matches && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2, color: 'common.black' }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <IconButton
                    size="large"
                    edge="start"
                    sx={{ mr: 2, color: '#5C5C5C' }}
                    onClick={toggleDrawer}
                >
                    <Search />
                </IconButton>
                <Box
                    flexGrow={1}
                    display="flex"
                    alignItems="center"
                    columnGap={1}
                    justifyContent="end"
                >
                    <IconButton>
                        <Badge badgeContent={99} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <SettingIcon />
                    </IconButton>
                    <UserMenu />
                </Box>
            </Toolbar>
        </MuiAppBar>
    );
};

type AppBarProps = {
    open?: boolean;
    toggleDrawer?: () => void;
};
