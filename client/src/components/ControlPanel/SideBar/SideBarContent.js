import { MenuItem, SubMenu } from 'react-pro-sidebar';
import PropTypes from 'prop-types';
import {
    Link,
    matchPath,
    useLocation
} from "react-router-dom";

const SideBarContent = ({ items }) => {
    const location = useLocation();

    const isActive = (href) => {
        return href ? !!matchPath({
            path: href,
            end: false
        }, location.pathname) : false;
    }

    return (
        <>
            {items.map((item, index) => {
                const { type, label, icon: Icon } = item;

                if (type === 'item') {
                    const { href } = item;

                    return (
                        <MenuItem
                            routerLink={<Link to={href} />}
                            key={index}
                            icon={<Icon />}
                            active={isActive(href)}
                        >
                            {label}
                        </MenuItem>
                    );
                } else if (type === 'subMenu') {
                    return (
                        <SubMenu label={label} icon={<Icon />} key={index}>
                            {item.items.map((el, i) => (
                                <MenuItem
                                    routerLink={<Link to={el.href} />}
                                    key={i}
                                    active={isActive(el.href)}
                                >
                                    {el.label}
                                </MenuItem>
                            ))}
                        </SubMenu>
                    );
                }

                return <></>
            })}
        </>
    );
};

SideBarContent.propTypes = {
    items: PropTypes.array.isRequired
};

export default SideBarContent;