import { Breadcrumbs as MuiBreadcrumbs, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../types/breadcrumb.type';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const breadcrumbButtonStyles = {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, 0.88)',
    textAlign: 'center',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
};

const Breadcrumbs = ({ items }: { items: Array<Breadcrumb> }) => {
    return (
        <MuiBreadcrumbs
            separator="›"
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
        >
            {items.map((item, index) => (
                <Button
                    key={index}
                    component={Link}
                    to={item.link}
                    variant="text"
                    sx={{
                        ...breadcrumbButtonStyles,
                        ...(index === items.length - 1 && {
                            color: '#0080FF',
                        }),
                    }}
                >
                    {item.text}
                </Button>
            ))}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
