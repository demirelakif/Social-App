import { useRoutes } from "react-router-dom";
import Layout from "../components/LayoutComponent"
import LoginComponent from "../components/LoginComponent"
import RegisterComponent from "../components/RegisterComponent"
import HomeComponent from "../components/HomeComponent"
import ProfileComponent from "../components/ProfileComponent"

export default function Router() {
let element = useRoutes([
    {
        children: [
           { path: "/login", element: <LoginComponent /> },
           { path: "/register", element: <RegisterComponent /> },
        ],
    },
    {
        element: <Layout />,
        children: [
            { path: "/", element: <HomeComponent /> },
            { path: "/home", element: <HomeComponent /> },
            { path: "/profile/:username", element: <ProfileComponent /> },
        ],
    },
]);
return element;
}