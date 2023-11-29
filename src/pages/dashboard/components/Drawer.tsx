import React from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {
    IconButton,
    Toolbar,
    useMediaQuery,
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MainLogo } from '../../../components/icons/MainLogo';
import PostIcon from '../../../components/icons/PostsIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NAVS: Nav[] = [
    {
        title: 'Posts',
        icon: <PostIcon />,
        childrens: [
            {
                title: 'Statistics',
            },
            {
                title: 'Management',
            },
        ],
    },
];
const CustomDrawer = ({
    open,
    toggleDrawer,
    ...props
}: Partial<DrawerProps> & { toggleDrawer?: () => void }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: matches && open ? '100%' : 280,
                '& .MuiDrawer-paper': {
                    width: matches && open ? '100%' : 280,
                    boxSizing: 'border-box',
                    bgcolor: 'white',
                    borderRight: '1px dashed #474747',
                },
                ...(matches && !open && { display: 'none' }),
            }}
            {...props}
        >
            <Toolbar
                sx={{ justifyContent: 'left', alignItems: 'center', mb: 2 }}
            >
                <div
                    style={{
                        height: 72,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16,
                    }}
                >
                    <MainLogo />
                </div>
                <Typography variant="h1" fontWeight={600} sx={{ flexGrow: 1 }}>
                    Socialha
                </Typography>

                {matches && (
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                )}
            </Toolbar>
            {NAVS.map((nav) => (
                <Accordion
                    defaultExpanded
                    disableGutters
                    sx={{
                        bgcolor: 'transparent',
                        boxShadow: 'none',
                        '&::before': {
                            display: 'none',
                        },
                    }}
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                sx={{
                                    color: 'common.black',
                                }}
                            />
                        }
                    >
                        {nav.icon}
                        <Typography
                            variant="h6"
                            style={{
                                marginLeft: 12,
                                color: '#0080FF',
                                fontSize: 15,
                                fontWeight: '700',
                            }}
                        >
                            {nav.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {nav.childrens.map((child, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={child.onClick}
                                >
                                    <Typography
                                        variant="body1"
                                        style={{ marginLeft: 12 }}
                                    >
                                        {child.title}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Drawer>
    );
};

type Nav = {
    icon?: React.ReactNode;
    title: string;
    childrens: Array<
        Omit<Nav, 'childrens'> & {
            onClick?: () => void;
        }
    >;
};
export default CustomDrawer;
