import {SxProps, useTheme} from "@mui/material"

type StylesTypeSecond = {
    [Key: string]: SxProps
}

type stylesTypeFirst = {
    [Key: string]: StylesTypeSecond
}


const useStyles = (): stylesTypeFirst => {
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
        },

        // hud
        hud: {
            root: {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
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
            left: {
                // marginLeft: "20px"
            },
            right: {
                display: "flex",
            },
            play_control: {
                color: palette.onPrimaryContainer.main
            }
        },

        // drawer
        drawer: {
            drawer: {
                height: "80%",
                backgroundColor: palette.surfaceContainerLow.main,
                borderRadius: "30px 30px 0 0",
            },
            drawer_opener: {
                color: palette.onSurface.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
                fontWeight: "bold",
                backgroundColor: palette.surfaceContainerLow.main,
                fontSize: "20px"
            }
        },


        // machine
        machine: {
            root: {
                height: "600px",
                width: "2500px",
                marginBottom: "400px"

            }
        },

        // ControlPanel
        controlPanel: {
            root: {
                paddingTop: "30px"
            },
            table: {
                boxShadow: "none",
                overflow: "scroll",
                borderRadius: "30px",
                margin: "0 10px"
            },
            input: {
                width: "30%",
                display: "flex",
                justifyContent: "space-around",
            },
            input_container: {
                marginBottom: "30px",
                marginLeft: "30px"
            },
            latex: {
                marginTop: "10px"
            }
        }
    }
}


export default useStyles;