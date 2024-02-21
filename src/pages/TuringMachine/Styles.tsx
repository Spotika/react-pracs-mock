import {SxProps, useTheme} from "@mui/material"

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
                // justifyContent: "flex-end"
                // alignItems: "flex-end"
            },
            hud: {
                // height: "100px",
                // paddingTop: "15px",
                width: "100%",
                // height: "500px"
            },
            slider: {
                display: "block",
                // height: "10px"
            },
            slider_block: {
                display: "flex",
                alignItems: "center"
            }
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
                height: "600px",
                // flexGrow: "1"
                marginBottom: "400px"

            }
        }
    }
}


export default useSyles;