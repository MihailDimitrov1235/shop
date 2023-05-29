import { Divider } from '@mui/material';
import NavItem from './NavItem';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileItem from './ProfileItem';
import PropTypes from 'prop-types';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated} from '@react-spring/web'

const NavbarContent = ({ item }) => {

    const [{transform}, api] = useSpring( () => ({
        transform: "scale(1)",

      }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({transform:hovering? 'scale(1.1)': 'scale(1)'}),
})

    return (
        <>
            {item.type === 'link' && (
                
                <NavItem
                    title={item.title}
                    href={item.href}
                    {...item}
                />
                
            )}

            {item.type === 'langSwitcher' && (
                // <animated.div {...bind()} style={{transform}}>
                //     <LanguageSwitcher />
                // </animated.div>
                <LanguageSwitcher />
            )}

            {item.type === 'divider' && (
                <Divider orientation={item.orientation || 'horizontal'} flexItem />
            )}

            {item.type === 'profile' && (
                <ProfileItem />
            )}
        </>
    );
};

NavbarContent.propTypes = {
    item: PropTypes.object.isRequired
};

export default NavbarContent;