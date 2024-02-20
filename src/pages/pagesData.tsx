import {routerType} from "../types/router.types";
// import About from "./temp/About/About";
import ColorSystem from "./temp/ColorSystem/ColorSystem";
import Home from "./temp/Home/Home";
import About from "./temp/About/About.tsx";
import TuringMachine from "./TuringMachine/TuringMachine.tsx";

const pagesData: routerType[] = [
    {
        path: "Home",
        element: <Home/>,
        title: "Home",
    },
    {
        path: "ColorSystem",
        element: <ColorSystem/>,
        title: "Color System"
    },
    {
        path: "About",
        element: <About/>,
        title: "about"
    },
    {
        path: "TuringMachine",
        element: <TuringMachine/>,
        title: "TuringMachine"
    }
];

export default pagesData;