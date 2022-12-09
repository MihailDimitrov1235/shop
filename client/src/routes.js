import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ControlPanelLayout from './components/ControlPanel/ControlPanelLayout';

import Landing from './pages/PublicWebsite/Landing';
import Products from './pages/PublicWebsite/Products';

import Dashboard from './pages/ControlPanel/Dashboard';

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
  },
  {
    path: 'admin',
    element: <ControlPanelLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
