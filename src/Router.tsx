import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Prueba from "./components/Prueba";
import AppLayouts from "./layouts/AppLayouts";
import AuthLayouts from "./layouts/AuthLayouts";
import DashboardView from "./views/DashboardView";

const router = createBrowserRouter([
  {
    path:'/',
    element:<AppLayouts/>,
    children: [
      {
        index:true,
        element:<DashboardView/>
      }
    ]
  },
  {
    path:'/auth',
    element:<AuthLayouts/>,
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
