import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Landing from './pages/Landing';
import Products from './pages/Products';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <Landing /> },
      { path: 'products', element: <Products /> },
      { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
