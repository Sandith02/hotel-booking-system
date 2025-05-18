import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// Pages (we'll create these next)
import HomePage from '../pages/Home';
import HotelsPage from '../pages/Hotels';
import HotelDetailsPage from '../pages/HotelDetails';
import LoginPage from '../pages/Authentication/Login';
import RegisterPage from '../pages/Authentication/Register';
import NotFoundPage from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'hotels',
        element: <HotelsPage />,
      },
      {
        path: 'hotels/:id',
        element: <HotelDetailsPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;