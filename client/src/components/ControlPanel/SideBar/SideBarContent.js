import { MenuItem, SubMenu } from 'react-pro-sidebar';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const SideBarContent = ({ items }) => {
    return (
        <>
            {items.map((item, index) => {
                const { type, label, icon: Icon } = item;

                if(type === 'item') {
                    return <MenuItem routerLink={<Link to={item.href} />} key={index} icon={<Icon />}> {label} </MenuItem>
                }else if(type === 'subMenu') {
                    return (
                        <SubMenu label={label}  icon={<Icon />} key={index}>
                            {item.items.map((el, i) => (
                                <MenuItem routerLink={<Link to={el.href} />} key={i}> {el.label} </MenuItem>
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