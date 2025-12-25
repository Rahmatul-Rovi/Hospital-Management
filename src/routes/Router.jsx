import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Appointments from "../pages/Appointments";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import FindDoctors from "../pages/FindDoctors";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App.jsx ekhon main layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/appointments",
        element: <PrivateRoute> <FindDoctors></FindDoctors> </PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute> <Dashboard /> </PrivateRoute>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: '/profile',
        element: <PrivateRoute> <Profile></Profile> </PrivateRoute>
      }
    ],
  },
]);