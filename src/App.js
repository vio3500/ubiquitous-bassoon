import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./login";
import CallBoard from "./callBoard";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Hello world!</div>,
        },
        {
            path: "/Login",
            element: <Login />,
        },
        {
            path: "/CallBoard",
            element: <CallBoard />,
        }
    ]);
    return (
        <RouterProvider router={router} />
    )
}

export default App;
