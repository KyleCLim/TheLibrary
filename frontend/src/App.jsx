import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/authContext";
import "./style.scss";

const Layout = () => {
    return (
        <AuthContextProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </AuthContextProvider>
    );
};

const ContextWrapped = ({ content }) => {
    return <AuthContextProvider>{content}</AuthContextProvider>;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/post/:id",
                element: <Single />,
            },
            {
                path: "/write",
                element: <Write />,
            },
            {
                path: "/user",
                element: <User />,
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <ContextWrapped content={<Login />} />,
    },
    {
        path: "/write",
        element: <Write />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/user",
        element: <User />,
    },
]);

function App() {
    return (
        <div className="app">
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
