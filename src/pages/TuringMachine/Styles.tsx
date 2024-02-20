import {SxProps, useTheme} from "@mui/material"
import { CSSProperties } from "@mui/styled-engine-sc";


type StylesTypeSecond = {
    [Key: string]: SxProps
}

type stylesTypeFirst = {
    [Key: string]: StylesTypeSecond
}


const useSyles = (): stylesTypeFirst => {
    const theme = useTheme();

    const palette = theme.palette;

    return {
        // main
        main: {
            root: {
                backgroundColor: palette.surface.main,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
                // alignItems: "flex-end"
            },
        },

        // drawer
        drawer: {
            drawer: {
                height: "80%",
                backgroundColor: palette.surfaceContainerLow.main
            },
            drawer_opener: {
                color: palette.onSurface.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // paddingLeft: "30px",
                // textAlign: "center",
                // textJustify: "inter-character",
                height: "80px",
                // width: "100%",
                fontWeight: "bold",
                backgroundColor: palette.surfaceContainerLow.main,
                fontSize: "24px"
            },
        },


        // machine
        machine: {
            root: {
                flexGrow: "1"
            }
        }
    }
}


export default useSyles;