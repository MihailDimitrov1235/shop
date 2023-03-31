import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const MainLayoutRoot = styled('div')(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
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
    paddingTop: 80
});

const MainLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
});

const MainLayoutContent = styled('div')({
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    justifyContent: 'space-between'
});

const MainLayout = () => {
    return (
        <MainLayoutRoot>
            <Navbar />
            <MainLayoutWrapper>
                <MainLayoutContainer>
                    <MainLayoutContent className='main-content'>
                        <Outlet />
                        <Footer />
                    </MainLayoutContent>
                </MainLayoutContainer>
            </MainLayoutWrapper>
        </MainLayoutRoot>
    );
};

export default MainLayout;