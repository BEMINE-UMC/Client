import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layout/RootLayout";
import HomePage from "../../pages/main/HomePage";
import MyPage from "../../pages/mine/MyPage";
import TemplatePage from "../../pages/main/TemplatePage";
import Login from "../../pages/auth/Login";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'my',
          element: <MyPage />
        },
        {
          path: 'template',
          element: <TemplatePage />
        },
        {
          path: '/login',
          element: <Login/>
        }
      ],
    },
  ]);
  