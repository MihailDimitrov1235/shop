import { Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import MainLayout from './components/MainLayout';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <Landing /> },
      { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
