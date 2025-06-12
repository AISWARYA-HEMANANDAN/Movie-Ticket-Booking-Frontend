import { createBrowserRouter, } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Userlayout from "../layouts/Userlayout";
import Movies from "../pages/Movies";
import Booking from "../pages/Booking";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import AdminDashboard from "../pages/AdminDashboard";
import AdminScreens from "../pages/AdminScreens";
import AdminMovies from "../pages/AdminMovies";
import AdminBookings from "../pages/AdminBookings";
import Adminlayout from "../layouts/Adminlayout";
import AdminUsers from "../pages/AdminUsers";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Userlayout />,
        errorElement: <h1>Error page</h1>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "register",
                element: <Signup />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "movies",
                element: <Movies />
            },
            {
                path: "booking/:id",
                element: <Booking />
            },
            {
                path: "payment/success",
                element: <PaymentSuccess />
            },
            {
                path: "payment/failed",
                element: <PaymentFailed />
            }
        ]
    },
    {
        path: "/admin",
        element: <Adminlayout />,
        errorElement: <h1>Error page</h1>,
        children: [
            {
                path: "login",
                element: <Login role="admin" />
            },
            {
                path: "dashboard",
                element: <AdminDashboard />
            },
            {
                path: "screens",
                element: <AdminScreens />
            },
            {
                path: "movies",
                element: <AdminMovies />
            },
            {
                path: "bookings",
                element: <AdminBookings />
            },
            {
                path: "users",
                element: <AdminUsers />
            }
        ]
    }
]);

export default routes