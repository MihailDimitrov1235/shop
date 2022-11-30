import {
    Link as RouterLink,
    matchPath,
    useLocation
} from 'react-router-dom';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const NavItem = ({
    href,
    title,
    ...rest
}) => {
    const location = useLocation();

    const active = href ? !!matchPath({
        path: href,
        end: false
    }, location.pathname) : false;

    return (
        <Button
            component={RouterLink}
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                color: rest.textcolor || 'text.black',
                fontSize: 16,
                fontWeight: 'medium',
                letterSpacing: 0,
                py: rest.paddingY || 0.75,
                px: rest.paddingX || 0,
                mx: 3,
                textTransform: 'none',
                width: '100%',
                ...(active && {
                    color: 'primary.contrastText'
                }),
                // '& svg': {
                //     mr: 1
                // },
            }}
            to={href}
            {...rest}
        >
            <span>
                {title}
            </span>
        </Button>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
};

export default NavItem;