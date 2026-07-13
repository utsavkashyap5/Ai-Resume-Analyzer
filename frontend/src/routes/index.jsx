import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Spinner from '../components/common/Spinner';

const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Results = lazy(() => import('../pages/Results'));
const History = lazy(() => import('../pages/History'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

const PageLoader = () => (
  <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <SuspenseWrapper><Login /></SuspenseWrapper> },
      { path: '/register', element: <SuspenseWrapper><Register /></SuspenseWrapper> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/dashboard', element: <SuspenseWrapper><Dashboard /></SuspenseWrapper> },
          { path: '/results', element: <SuspenseWrapper><Results /></SuspenseWrapper> },
          { path: '/history', element: <SuspenseWrapper><History /></SuspenseWrapper> },
          { path: '/profile', element: <SuspenseWrapper><Profile /></SuspenseWrapper> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <SuspenseWrapper><Landing /></SuspenseWrapper>,
  },
  {
    path: '*',
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>        ,
  },
]);

export default router;
