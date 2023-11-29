import {
    Avatar,
    Box,
    IconButton,
    MenuItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import SignoutIcon from '@mui/icons-material/ExitToApp';
import { DropDownMenu } from '../../../components/DropdownMenu';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <Box display="flex" sx={{ placeContent: 'end' }}>
            <DropDownMenu
                button={(props) => (
                    <IconButton {...props}>
                        <Avatar
                            src="https://i.pravatar.cc/150?img=4"
                            sx={{
                                width: '36px',
                                height: '36px',
                                borderColor: ({ palette }) =>
                                    palette.primary.light,
                            }}
                        />
                    </IconButton>
                )}
            >
                <MenuItem onClick={handleLogout}>
                    <ListItemText sx={{ color: 'common.black' }}>
                        Signout
                    </ListItemText>
                    <ListItemIcon>
                        <SignoutIcon sx={{ color: 'common.black' }} />
                    </ListItemIcon>
                </MenuItem>
            </DropDownMenu>
        </Box>
    );
};
