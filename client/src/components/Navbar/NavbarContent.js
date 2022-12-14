import { Divider } from '@mui/material';
import NavItem from './NavItem';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileItem from './ProfileItem';
import PropTypes from 'prop-types';

const NavbarContent = ({ items }) => {
    return (
        <>
            {items.map((item, index) => {
                if (item.type === 'link') {
                    return (
                        <NavItem
                            key={index}
                            title={item.title}
                            href={item.href}
                            {...item}
                        />
                    );
                } else if (item.type === 'langSwitcher') {
                    return <LanguageSwitcher key={index} />
                } else if (item.type === 'divider') {
                    return <Divider orientation="vertical" flexItem key={index} />
                } else if (item.type === 'profile') {
                    return <ProfileItem key={index} />
                }
            })}
        </>
    );
};

NavbarContent.propTypes = {
    items: PropTypes.array.isRequired
};

export default NavbarContent;