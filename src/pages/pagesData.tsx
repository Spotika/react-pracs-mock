import {routerType} from "../types/router.types";
// import About from "./temp/About/About";
import ProtectedRoute from "../api/protectedRoute.tsx";
import ColorSystem from "./temp/ColorSystem/ColorSystem";
import Home from "./temp/Home/Home";
import About from "./temp/About/About.tsx";
import PersonalArea from "./PersonalArea/PersonalArea.tsx";
import Group from "./Groups/Group.tsx"

const pagesData: routerType[] = [
    {
        path: "Home",
        element: <ProtectedRoute>
            <Home/>
        </ProtectedRoute>,
        title: "Home",
    },
    {
        path: "ColorSystem",
        element: <ColorSystem/>,
        title: "Color System"
    },
    {
        path: "About",
        element: <ProtectedRoute>
            <About/>
        </ProtectedRoute>,
        title: "about"
    },
    {
        path: "PersonalArea",
        element: <ProtectedRoute>
            <PersonalArea/>
        </ProtectedRoute>,
        title: "Personal Area"
    },
    {
        path: "Group/:id",
        element: <ProtectedRoute>
            <Group/>
        </ProtectedRoute>,
        title: "Group"
    }
];

export default pagesData;