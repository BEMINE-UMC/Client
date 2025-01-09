import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layout/RootLayout";
import MainPage from "../../pages/main/MainPage";
import MyPage from "../../pages/mine/MyPage";

import Login from "../../pages/auth/Login";
import TemplatePage from "../../pages/template/TemplatePage";
import Register from "../../pages/auth/Register";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <MainPage />,
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
        },
        {
          path: '/register',
          element: <Register/>
        }
      ],
    },
  ]);
  