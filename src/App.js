import "./App.css"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import Operations from "./Operations";
import CourseOverview from './CourseOverview';
import CourseDetails from './CourseDetails';

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
        {
            path: "/courses/:course_id/operations",
            element: <Operations/>
        }
    ]);
    return (
        <RouterProvider router={router} />
    )
}

export default App;
