import {FC} from "react";
import {Box, SxProps, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";


const AuthLayout: FC = () => {

    const theme = useTheme();

    const rootStyles: SxProps = {
        display: "flex",
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    }


    const mainStyles: SxProps = {
        backgroundColor: `${theme.palette.surfaceContainerLowest.main}`,
        borderRadius: '30px',
        border: `1px solid ${theme.palette.outline.main}`
        // justifySelf: 'center'
    }


    return <>
        <Box sx={rootStyles}>
            <Box sx={mainStyles}>
                <Outlet/>
            </Box>
        </Box>
    </>

}

export default AuthLayout