import { styled } from '@mui/material';
import { ProSidebarProvider } from "react-pro-sidebar";
import TopBar from './TopBar/TopBar';
import SideBar from './SideBar/SideBar';

const ControlPanelLayoutRoot = styled('div')(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        width: '100%'
    })
);

const ControlPanelLayoutWrapper = styled('div')({
    overflow: 'hidden',
    width: '100%'
});

const ControlPanelLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    height: '100%',
    paddingTop: 0,
});

const ControlPanelLayoutContent = styled('div')({
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
});

const ControlPanelLayout = (props) => {
    return (
        <ControlPanelLayoutRoot>
                <SideBar />
            <ControlPanelLayoutWrapper>
                <TopBar />
                <ControlPanelLayoutContainer>
                    <ControlPanelLayoutContent>
                        {props.children}
                    </ControlPanelLayoutContent>
                </ControlPanelLayoutContainer>
            </ControlPanelLayoutWrapper>
        </ControlPanelLayoutRoot>
    );
};

export default ControlPanelLayout;