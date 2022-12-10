import { Typography } from '@mui/material';
import { MenuItem} from 'react-pro-sidebar';
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import setSelected from "./SideBar";
const MenuButton = props => {
    return (
        <MenuItem
            active={props.selected === props.name}
            disabled={props.selected === props.name}
            style={{ paddingLeft:"40px" }}
            onClick={ () => props.setSelected(props.name)}
            routerLink={<Link to={props.to}/>}
        >
                {props.name}
        </MenuItem>
    );
}

export default MenuButton;