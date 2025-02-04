import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layout/RootLayout";
import MainPage from "../../pages/main/MainPage";

import MyPage from "../../pages/mine/MyPage";
import WriteContentPage from "../../pages/mine/Write_Content_Page";
import WriteTemplatePage from "../../pages/mine/Write_Template_Page";
import MobileProfilePage from "../../pages/mine/for_mobile/profilePage/profilePage";

import Login from "../../pages/auth/Login";
import TemplatePage from "../../pages/template/TemplatePage";
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
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/find-email',
        element: <FindEmailPage />
      },
      {
        path: '/find-password',
        element: <FindPasswordPage />
      },
      {
        path: '/writecontentpage',
        element: <WriteContentPage />
      },
      {
        path: '/writetemplatepage',
        element: <WriteTemplatePage />
      },
      {
        path: '/mobileprofilepage',
        element: <MobileProfilePage />
      },
    ],
  },
]);
