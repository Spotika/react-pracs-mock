import { routerType } from "../types/router.types";
// import About from "./temp/About/About";
import ColorSystem from "./temp/ColorSystem/ColorSystem";
import Home from "./temp/Home/Home";
import Signin from "./signin/Signin.tsx";
import About from "./temp/About/About.tsx";
import PersonalArea from "./PersonalArea/PersonalArea.tsx";

const pagesData: routerType[] = [
    {
        path: "Home",
        element: <Home />,
        title: "Home",
    },
    {
        path: "ColorSystem",
        element: <ColorSystem />,
        title: "Color System"
    },
    {
        path: "About",
        element: <About />,
        title: "about"
    },
    {
        path: "signin",
        element: <Signin/>,
        title: "signin"
    },
    {
        path: "PersonalArea",
        element: <PersonalArea/>,
        title: "Personal Area"
    }
];

export default pagesData;