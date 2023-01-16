import { Divider } from '@mui/material';
import NavItem from './NavItem';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileItem from './ProfileItem';
import PropTypes from 'prop-types';

const NavbarContent = ({ item }) => {
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