import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ControlPanelLayout from './components/ControlPanel/ControlPanelLayout';

import Landing from './pages/PublicWebsite/Landing';
import Products from './pages/PublicWebsite/Products';
import Login from './pages/PublicWebsite/Login';
import Register from './pages/PublicWebsite/Register';

import Dashboard from './pages/ControlPanel/Dashboard';
import AddProductForm from './pages/ControlPanel/Products/AddProductForm'
import ProductTable from "./pages/ControlPanel/Products/ProductTable";

import PageLayout from './components/ControlPanel/PageLayout';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: 'products', element: <Products /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      // { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'admin',
    element: <ControlPanelLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'products',
        element: <PageLayout title='products' />,
        children: [
          { path: '', element: <ProductTable />},
          { path: 'create', element: <AddProductForm />},
        ] 
      },
      {
        path: 'users',
        element: <PageLayout title='users' />,
        children: [
          { path: '', element: <ProductTable />},
          { path: 'create', element: <AddProductForm />},
        ] 
      },
      { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
