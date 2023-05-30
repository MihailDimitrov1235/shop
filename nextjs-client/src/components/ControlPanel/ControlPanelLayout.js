import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material';
import { ProSidebarProvider } from "react-pro-sidebar";
import TopBar from './TopBar/TopBar';
import SideBar from './SideBar/SideBar';

const ControlPanelLayoutRoot = styled('div')(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100%',
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

const ControlPanelLayout = () => {
    return (
        <ControlPanelLayoutRoot>
                <SideBar />
            <ControlPanelLayoutWrapper>
                <TopBar />
                <ControlPanelLayoutContainer>
                    <ControlPanelLayoutContent>
                        <Outlet />
                    </ControlPanelLayoutContent>
                </ControlPanelLayoutContainer>
            </ControlPanelLayoutWrapper>
        </ControlPanelLayoutRoot>
    );
};

export default ControlPanelLayout;