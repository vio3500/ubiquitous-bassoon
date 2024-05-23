import "./App.css"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import Operations from "./Operations";
import CourseOverview from './CourseOverview';
import CourseDetails from './CourseDetails';
import Test from "./test";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/courses",
            element: <CourseOverview/>
        },
        {
            path: "/courses/:course_id",
            element: <CourseDetails/>
        },
    ]);
    return (
        <RouterProvider router={router} />
    )
}

export default App;
