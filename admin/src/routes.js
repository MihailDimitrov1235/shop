import { Navigate } from 'react-router-dom';
//import MainLayout from './components/MainLayout';
import Dashboard from './pages/dashboard';

const routes = [
  {
    path: '/',
    // element: <MainLayout />,
    children: [
      { path: 'home', element: <Dashboard /> },
      { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;