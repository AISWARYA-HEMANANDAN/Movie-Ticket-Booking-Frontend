import { createBrowserRouter, } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Userlayout from "../layouts/Userlayout";
import Movies from "../pages/Movies";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Userlayout />,
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
                element: <Movies/>
            }
        ]
    }
]);

export default routes