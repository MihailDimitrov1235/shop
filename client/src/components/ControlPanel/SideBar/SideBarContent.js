import { MenuItem, SubMenu } from 'react-pro-sidebar';
import PropTypes from 'prop-types';
import {
    Link,
    matchPath,
    useLocation
} from "react-router-dom";

const SideBarContent = ({ items, ml = 30 }) => {
    const location = useLocation();

    const isActive = (href) => {
        return href ? !!matchPath({
            path: href,
            end: false
        }, location.pathname) : false;
    }

    const marginL = ml + 'px'

    console.log(marginL)

    return (
        <>
            {items.map((item, index) => {
                const { type, label } = item;
                if (type === 'item') {
                    const { href } = item;
                    if(!item.icon){
                        return(
                            <MenuItem
                                routerLink={<Link to={href} />}
                                key={index}
                                active={isActive(href)}
                                style={{
                                    position:'relative',
                                    marginLeft: marginL
                                }}
                            >
                                {label}
                            </MenuItem>
                        )
                    }
                    return (
                        <MenuItem
                            routerLink={<Link to={href} />}
                            key={index}
                            icon={<item.icon/>}
                            active={isActive(href)}
                        >
                            {label}
                        </MenuItem>
                    );
                } else if (type === 'subMenu') {
                    if(!item.icon){
                        return (
                            <SubMenu label={label} key={index} style={{
                                position:'relative',
                                marginLeft:marginL
                            }}>
                                <SideBarContent items={item.items}/>
                            </SubMenu>
                        );
                    }
                    return (
                        <SubMenu label={label} icon={<item.icon/>} key={index} >
                            <SideBarContent items={item.items} ml={ml-10}/>
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