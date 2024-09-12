import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Prueba from "./components/Prueba";
import AppLayouts from "./layouts/AppLayouts";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";

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
      }
    ]
  },
  {
    path:'/auth',
    element:<Suspense><AuthLayouts/></Suspense>,
    children: [
      {
        path:'prueba',
        element:<Prueba/>
      }
    ]
  }
])

export default function Router() {
  return (
    <RouterProvider router={router}/>
  )
}
