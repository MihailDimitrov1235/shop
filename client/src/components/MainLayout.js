import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const MainLayoutRoot = styled('div')(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    })
);

const MainLayoutWrapper = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 84
});

const MainLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
});

const MainLayoutContent = styled('div')({
    flex: '1 1 auto',
    gap: '50px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto'
});

const MainLayout = () => {
    return (
        <MainLayoutRoot>
            <Navbar />
            <MainLayoutWrapper>
                <MainLayoutContainer>
                    <MainLayoutContent>
                        <Outlet />
                        <Footer />
                    </MainLayoutContent>
                </MainLayoutContainer>
            </MainLayoutWrapper>
        </MainLayoutRoot>
    );
};

export default MainLayout;