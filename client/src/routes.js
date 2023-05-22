import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ControlPanelLayout from './components/ControlPanel/ControlPanelLayout';

import Landing from './pages/PublicWebsite/Landing';
import Products from './pages/PublicWebsite/Products';
import ProductPage from './pages/PublicWebsite/Products/Details';
import BloggerPage from './pages/PublicWebsite/Blogger/BloggerPage';
import PreviewBloggerPage from './pages/PublicWebsite/Blogger/PreviewBloggerPage';
import Cart from './pages/PublicWebsite/Cart';
import Login from './pages/PublicWebsite/Login';
import Register from './pages/PublicWebsite/Register';
import Account from './pages/PublicWebsite/Account';
import Payments from './pages/PublicWebsite/Payments/Payments';

import Dashboard from './pages/ControlPanel/Dashboard';

import AddProductForm from './pages/ControlPanel/Products/AddProductForm'
import ProductTable from "./pages/ControlPanel/Products/ProductTable";
import PreviewProduct from './pages/PublicWebsite/Products/PreviewProduct';

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

import Success from './pages/PublicWebsite/Payments/Success';
import Cancellation from './pages/PublicWebsite/Payments/Cancellation';

import RequestPage from './pages/ControlPanel/Requests/RequestPage';
import RequestAuthor from './pages/ControlPanel/Requests/RequestAuthor';
import RequestProduct from './pages/ControlPanel/Requests/RequestProduct';
import RequestPost from './pages/ControlPanel/Requests/RequestPost';

import BlogTable from './pages/ControlPanel/Blog/BlogTable';
import AddBlog from './pages/ControlPanel/Blog/AddBlog';
import EditBlog from './pages/ControlPanel/Blog/EditBlog';

import RegisterAuthor from './pages/PublicWebsite/Blogger/RegisterBlogger';

import PageLayout from './components/ControlPanel/PageLayout';

import BlogMainPage from './pages/PublicWebsite/Blog/BlogMainPage';
import BlogPost from './pages/PublicWebsite/Blog/BlogPost';
import BlogCreate from './pages/PublicWebsite/Blog/BlogCreate';

import Page404 from './pages/Page404';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Landing /> },
      // { path: '/404', element: <Page404 /> },
      {
        path: 'products',
        children: [
          { path: '', element: <Products /> },
          { path: ':id', element: <ProductPage /> },
          { path: 'edit/:id', element: <PreviewProduct /> },
        ]
      },

      {
        path: 'blogger',
        children: [
          { path: ':id', element: <BloggerPage /> },
          { path: 'edit/:id', element: <PreviewBloggerPage /> },
        ]
      },
      
      { path: 'login', element: <Login /> },
      {
        path: 'register',
        children: [
          { path: '', element: <Register /> },
          { path: 'author', element: <RegisterAuthor /> }
        ]
      },
      { path: 'account', element: <Account /> },
      { path: 'cart', element: <Cart /> },
      // { path: '/', element: <Navigate to="/home" /> },
      // { path: '*', element: <Navigate to="/404" /> }
      { path: 'blog', 
      children:[
        {path: '', element: <BlogMainPage/>},
        {path: ':slug', element: <BlogPost/>},
        {path: 'create', element: <BlogCreate/>}
     ]},
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
      {
        path: 'blog',
        element: <PageLayout title='blog' />,
        children: [
          { path: '', element: <BlogTable />},
          { path: 'create', element: <AddBlog />},
          { path: 'edit/:id', element: <EditBlog/>},
        ] 
      },
      {
        path: 'requests',
        element: <PageLayout title='requests' />,
        children: [
          { path: '', element: <RequestPage />},
          { path: 'authors', element: <RequestAuthor />},
          { path: 'products', element: <RequestProduct/>},
          { path: 'posts', element: <RequestPost/>},
        ] 
      },
      { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'payment',
    children: [
      { path: 'success', element: <Success /> },
      { path: 'cancellation', element: <Cancellation /> }
    ]
  },
  { path: '*', element: <Page404 /> }
];

export default routes;
