import { useState, useEffect, lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Spinner from '../components/common/Spinner';
import Landing from '../pages/Landing';

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

function RootLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const [landingMounted, setLandingMounted] = useState(() => isLanding);

  useEffect(() => {
    if (isLanding) {
      setLandingMounted(true);
    }
  }, [isLanding]);

  useEffect(() => {
    if (!isLanding) {
      try {
        sessionStorage.setItem('lm_scroll', String(window.scrollY));
      } catch {}
    }
  }, [isLanding]);

  useEffect(() => {
    if (!isLanding) return;
    const saved = sessionStorage.getItem('lm_scroll');
    if (saved) {
      requestAnimationFrame(() => {
        window.scrollTo(0, Number(saved));
      });
    }
  }, [isLanding]);

  return (
    <>
      {landingMounted && (
        <div style={{ display: isLanding ? '' : 'none' }}>
          <Landing />
        </div>
      )}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: null },
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
        path: '*',
        element: <SuspenseWrapper><NotFound /></SuspenseWrapper>,
      },
    ],
  },
]);

export default router;
