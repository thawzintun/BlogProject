import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import Post, { loader as postsLoader } from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import PostDetails, {
    action as postDeleteAction,
    loader as postDetailsLoader,
} from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import Error from "./pages/Error";
import { action as formAction } from "./components/PostForm";
import Auth from "./pages/Auth";
import { action as authAction } from "./components/AuthForm";
import { loader as signoutLoader } from "./util/logout";
import { authRouteToken, checkToken, loader as TokenLoader } from "./util/auth";

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
        errorElement: <Error />,
        id: "root",
        loader: TokenLoader,
        children: [
            {
                index: true,
                element: <Post />,
                loader: postsLoader,
            },
            {
                path: "/create",
                element: <CreatePost />,
                action: formAction,
                loader: checkToken,
            },
            {
                path: "/auth",
                element: <Auth />,
                action: authAction,
                loader: authRouteToken,
            },
            {
                path: "/logout",
                loader: signoutLoader,
            },
            {
                path: "/:id",
                id: "post-detail",
                loader: postDetailsLoader,
                children: [
                    {
                        index: true,
                        element: <PostDetails />,
                        action: postDeleteAction,
                    },
                    {
                        path: "edit",
                        element: <EditPost />,
                        action: formAction,
                        loader: checkToken,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
