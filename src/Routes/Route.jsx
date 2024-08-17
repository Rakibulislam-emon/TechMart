import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import ProductDetails from "../Pages/DetailPage/ProductDetails";

export const route = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children:[
     {
      path:'/',
      element:<Home/>
     },
     {
      path:'/details/:id',
      element:<ProductDetails/>,
      loader:({params}) => fetch(`${import.meta.env.VITE_API_URL}/details/${params.id}`)
     }

    ],
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  }
])