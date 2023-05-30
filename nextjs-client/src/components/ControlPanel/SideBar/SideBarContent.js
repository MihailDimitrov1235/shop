import { MenuItem, SubMenu } from 'react-pro-sidebar';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SideBarContent = ({ items, ml = 20 }) => {
    const location = useRouter();

    const isActive = (href) => {
        return href === location.pathname;
    }

    const marginL = ml + 'px'

    return (
        <>
            {items.map((item, index) => {
                const { type, label } = item;
                if (type === 'item') {
                    const { href } = item;
                    if(!item.icon){
                        return(
                            <MenuItem
                                component={<Link href={href} />}
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
                            component={<Link href={href} />}
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
                                <SideBarContent items={item.items} ml={ml+10}/>
                            </SubMenu>
                        );
                    }
                    return (
                        <SubMenu label={label} icon={<item.icon/>} key={index} >
                            <SideBarContent items={item.items} ml={ml+10}/>
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