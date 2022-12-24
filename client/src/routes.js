import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ControlPanelLayout from './components/ControlPanel/ControlPanelLayout';

import Landing from './pages/PublicWebsite/Landing';
import Products from './pages/PublicWebsite/Products';
import Login from './pages/PublicWebsite/Login';

import Dashboard from './pages/ControlPanel/Dashboard';
import AdminProducts from './pages/ControlPanel/AdminProduct';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: 'products', element: <Products /> },
      { path: 'login', element: <Login /> },
      // { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'admin',
    element: <ControlPanelLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
