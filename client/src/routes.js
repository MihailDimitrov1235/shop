import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ControlPanelLayout from './components/ControlPanel/ControlPanelLayout';

import Landing from './pages/PublicWebsite/Landing';
import Products from './pages/PublicWebsite/Products';
import ProductPage from './pages/PublicWebsite/ProductPage';
import Login from './pages/PublicWebsite/Login';
import Register from './pages/PublicWebsite/Register';
import Account from './pages/PublicWebsite/Account';

import Dashboard from './pages/ControlPanel/Dashboard';

import AddProductForm from './pages/ControlPanel/Products/AddProductForm'
import ProductTable from "./pages/ControlPanel/Products/ProductTable";

import UsersTable from './pages/ControlPanel/Users/UsersTable';
import AddUser from './pages/ControlPanel/Users/AddUser';
import EditUser from './pages/ControlPanel/Users/EditUser';

import AdminsTable from './pages/ControlPanel/Admins/AdminsTable';
import AddAdmin from './pages/ControlPanel/Admins/AddAdmin';
import EditAdmin from './pages/ControlPanel/Admins/EditAdmin';

import CategoriesTable from './pages/ControlPanel/Categories/CategoriesTable';
import AddCategory from './pages/ControlPanel/Categories/AddCategory';
import EditCategory from './pages/ControlPanel/Categories/EditCategory';

import AuthorsTable from './pages/ControlPanel/Authors/AuthorsTable';
import AddAuthor from './pages/ControlPanel/Authors/AddAuthor';
import EditAuthor from './pages/ControlPanel/Authors/EditAuthor';

import PageLayout from './components/ControlPanel/PageLayout';

import Page404 from './pages/Page404';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Landing /> },
      // { path: '/404', element: <Page404 /> },
      { path: 'products', element: <Products /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'account', element: <Account /> },
      // { path: '/', element: <Navigate to="/home" /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'admin',
    element: <ControlPanelLayout />,
    children: [
      { path: 'account', element: <Account /> },
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
          { path: 'create', element: <AddUser />},
          { path: 'edit/:id', element: <EditUser />},
        ] 
      },
      {
        path: 'admins',
        element: <PageLayout title='admins' />,
        children: [
          { path: '', element: <AdminsTable />},
          { path: 'create', element: <AddAdmin />},
          { path: 'edit/:id', element: <EditAdmin />},
        ] 
      },
      {
        path: 'categories',
        element: <PageLayout title='categories' />,
        children: [
          { path: '', element: <CategoriesTable />},
          { path: 'create', element: <AddCategory />},
          { path: 'edit/:id', element: <EditCategory />},
        ] 
      },
      {
        path: 'authors',
        element: <PageLayout title='authors' />,
        children: [
          { path: '', element: <AuthorsTable />},
          { path: 'create', element: <AddAuthor />},
          { path: 'edit/:id', element: <EditAuthor/>},
        ] 
      },
      { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  { path: '*', element: <Page404 /> }
];

export default routes;
