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
            },
            hud: {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "30px 0",
                backgroundColor: palette.primaryContainer.main,
                color: palette.onPrimaryContainer.main
            },
            slider: {
                alignSelf: "right",
                display: "block",
                width: "200px",
                marginLeft: "20px",
            },
            slider_block: {
                display: "flex",
                alignItems: "center",
                marginRight: "40px"
            },
            hud_left: {
                marginLeft: "20px"
            }, 
            hud_right: {

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
                width: "2860px",
                // flexGrow: "1"
                marginBottom: "400px"

            }
        }
    }
}


export default useSyles;