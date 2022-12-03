import { Navigate } from 'react-router-dom';
//import MainLayout from './components/MainLayout';
import Dashboard from './pages/dashboard';
// import Projects from './pages/projects';
// import Settings from './pages/settings';


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