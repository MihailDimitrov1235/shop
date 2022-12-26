import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ControlPanelLayout from './components/ControlPanel/ControlPanelLayout';

import Landing from './pages/PublicWebsite/Landing';
import Products from './pages/PublicWebsite/Products';
import Login from './pages/PublicWebsite/Login';
import Register from './pages/PublicWebsite/Register';

import Dashboard from './pages/ControlPanel/Dashboard';
import AdminProducts from './pages/ControlPanel/AdminProduct';
import AddProductForm from './pages/ControlPanel/Products/AddProductForm'
import ProductTable from "./pages/ControlPanel/Products/ProductTable";

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
      { path: 'products', element: <AdminProducts />, children: [
        { path: '/admin/products', element: <Navigate to="/admin/products/data" />},
        { path: 'create', element: <AddProductForm />},
        { path: 'data', element: <ProductTable />}
      ] },
      { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
