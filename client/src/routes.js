import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ControlPanelLayout from './components/ControlPanel/ControlPanelLayout';

import Landing from './pages/PublicWebsite/Landing';
import Products from './pages/PublicWebsite/Products';
import Login from './pages/PublicWebsite/Login';
import Register from './pages/PublicWebsite/Register';
import Account from './pages/PublicWebsite/Account';

import Dashboard from './pages/ControlPanel/Dashboard';
import AddProductForm from './pages/ControlPanel/Products/AddProductForm'
import ProductTable from "./pages/ControlPanel/Products/ProductTable";
import UsersTable from './pages/ControlPanel/Users/UsersTable';
import AddUserForm from './pages/ControlPanel/Users/AddUserForm';
import AdminsTable from './pages/ControlPanel/Admins/AdminsTable';
import AddAdminForm from './pages/ControlPanel/Admins/AddAdminForm';

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
      { path: 'account', element: <Account /> },
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
          { path: 'edit/:id', element: <AddProductForm />},
        ] 
      },
      {
        path: 'users',
        element: <PageLayout title='users' />,
        children: [
          { path: '', element: <UsersTable />},
          { path: 'create', element: <AddUserForm />},
          { path: 'edit/:id', element: <AddProductForm />},
        ] 
      },
      {
        path: 'admins',
        element: <PageLayout title='admins' />,
        children: [
          { path: '', element: <AdminsTable />},
          { path: 'create', element: <AddAdminForm />},
          { path: 'edit/:id', element: <AddProductForm />},
        ] 
      },
      { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
