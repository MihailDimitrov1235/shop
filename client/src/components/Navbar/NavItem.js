import { useState } from 'react';
import {
    Link as RouterLink,
    matchPath,
    useLocation
} from 'react-router-dom';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated} from '@react-spring/web'

const NavItem = ({
    href,
    title,
    ...rest
}) => {
    const location = useLocation();

    const active = href ? !!matchPath({
        path: href,
        end: true
    }, location.pathname) : false;

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const condition = (active || isHovering) && !rest.variant;

    const springs = useSpring({
        transform: isHovering? 'scale(1.15)': 'scale(1)'
    })

    const bind = useGesture({
        onHover:() => setIsHovering(!isHovering) && console.log("change"),
    })

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
                py: rest.paddingy || 0.75,
                px: rest.paddingx || 0,
                mx: rest.marginx || 3,
                textTransform: 'none',
                width: '100%',
                ...(condition  && {
                    color: 'primary.contrastText',
                }),
                ...(condition && {
                    '&:after': {
                        content: '""',
                        width: '100%',
                        backgroundColor: 'primary.contrastText',
                        height: '5px',
                        position: 'absolute',
                        bottom: -5
                    },
                }),
                ':first-of-type': {
                    ml: 0
                },
                ':last-child': {
                    mr: 0
                }
                // '& svg': {
                //     mr: 1
                // },
            }}
            to={href}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            {...rest}
        >
            <span>
                <animated.div {...bind()} style={springs}>
                    {title}
                </animated.div>
            </span>
        </Button>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
};

export default NavItem;