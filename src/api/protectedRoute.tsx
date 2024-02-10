import {getCurrentUser} from "./auth.tsx";
// import {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useState} from "react";

const ProtectedRoute = ({children} : any, _permissions: any=[]) => {

    let location = useLocation();
    // const [den, setDen] = useState<any>(null)

    // useEffect( () => {
    //     async function temp() {
    //         let current_user = await getCurrentUser();
    //
    //         if (current_user === undefined) {
    //             // setDen(<Navigate to="/auth/signin" state={{from: location}} replace/>);
    //         } else {
    //             setDen(children);
    //         }
    //
    //         // let current_perms = await getWithToken("auth/user_permissions", {});
    //     }
    //     temp();
    // }, []);


    const [flag, setFlag] = useState<boolean>(true);
    getCurrentUser().then((val) => {
        if (val === undefined) {
            setFlag(false);
        }
    });

    // console.log(flag);
    // if (currentUser != undefined) {
    //     // console.log(currentUser);
    //
    // } else {
    //     return <Navigate to="/auth/signin" state={{from: location}} replace/>
    // }
    if (flag) {
        return children
    }
    return <Navigate to="/auth/signin" state={{from: location}} replace/>;
}

export default ProtectedRoute