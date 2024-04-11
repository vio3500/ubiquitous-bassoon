import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./login";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Hello world!</div>,
        },
        {
            path: "/Login",
            element: <Login />,
        }
    ]);
    return (
        <RouterProvider router={router} />
    )
}

export default App;
