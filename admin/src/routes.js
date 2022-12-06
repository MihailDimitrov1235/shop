import { Navigate } from 'react-router-dom';
//import MainLayout from './components/MainLayout';
import Dashboard from './pages/dashboard';
import Products from './pages/products';
// import Projects from './pages/projects';
// import Settings from './pages/settings';


const routes = [
  {
    path: '/',
    // element: <MainLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/products', element: <Products /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
