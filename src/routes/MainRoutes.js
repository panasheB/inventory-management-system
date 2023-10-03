import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AddTransaction from 'pages/dashboard/AddTransaction';
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));



const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'typography',
      element: <Typography />
    },
    {
      path:'transactions',
      element:<AddTransaction/>
    }
 
  ]
};

export default MainRoutes;
