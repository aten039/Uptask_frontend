import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayouts from "./layouts/AppLayouts";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProject from "./views/projects/EditProject";
import DetailsProjectView from "./views/projects/DetailsProjectView";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPassword from "./views/auth/ForgotPassword";
import NewPasswordView from "./views/auth/NewPasswordView";

const AuthLayouts  = lazy(()=> import("./layouts/AuthLayouts"));

const router = createBrowserRouter([
  {
    path:'/',
    element:<AppLayouts/>,
    children: [
      {
        index:true,
        element:<DashboardView/>
      },
      {
        path:'project/create',
        element:<CreateProjectView/>
      },
      {
        path:'project/:projectId',
        element:<DetailsProjectView/>
      },
      {
        path:'project/:projectId/edit',
        element:<EditProject/>
      }
    ]
  },
  {
    path:'/auth',
    element:<Suspense><AuthLayouts/></Suspense>,
    children: [
      {
        path:'login',
        element:<LoginView/>
      },
      {
        path:'register',
        element:<RegisterView/>
      },
      {
        path:'confirm-account',
        element:<ConfirmAccountView/>
      },
      {
        path:'request-code',
        element:<RequestNewCodeView/>
      },
      {
        path:'forgot-password',
        element:<ForgotPassword/>
      },
      {
        path:'new-password',
        element:<NewPasswordView/>
      }
    ]
  }
])

export default function Router() {
  return (
    <RouterProvider router={router}/>
  )
}
