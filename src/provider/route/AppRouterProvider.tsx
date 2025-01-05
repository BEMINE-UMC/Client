import { router } from './Router.tsx';
import { RouterProvider } from 'react-router';

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};
