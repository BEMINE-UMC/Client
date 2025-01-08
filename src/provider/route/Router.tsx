import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layout/RootLayout";
import HomePage from "../../pages/main/HomePage";
import MyPage from "../../pages/mine/MyPage";
import TemplatePage from "../../pages/main/TemplatePage";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import FindEmailPage from "../../pages/auth/FindEmailPage";
import FindPasswordPage from "../../pages/auth/FindPasswordPage";

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
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '/findemail',
          element: <FindEmailPage/>
        },
        {
          path: '/findpassword',
          element: <FindPasswordPage/>
        }
      ],
    },
  ]);
  