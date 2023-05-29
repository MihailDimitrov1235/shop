import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useGesture } from '@use-gesture/react';
import useMeasure from 'react-use-measure';
import { useSpring, animated} from '@react-spring/web';

const NavItem = ({
    href,
    title,
    ...rest
}) => {
    const { pathname } = useRouter();

    const active = href === pathname;

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const condition = (active || isHovering) && !rest.variant;


    const [ref, { width }] = useMeasure()
    const spring = useSpring({ 
        width: rest.underline === false? 0 : condition? width : 0 
    })

    return (
        <Button
            ref={ref}
            component={Link}
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
            href={href}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            {...rest}
        >
            <span>
                {/* <animated.div {...bind()} style={springs}>
                    {title}
                </animated.div> */}
                {title}
            </span>
                <animated.div style={{
                    position:'absolute',
                    left:'0px',
                    overflow:'hidden',
                    backgroundColor:'#96011c',
                    height:'2px',
                    position:'absolute',
                    bottom:-2,
                    ...spring
                }}/>
        </Button>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
};

export default NavItem;