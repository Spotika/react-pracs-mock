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
                padding: "20px",
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
                // marginLeft: "20px"
            }, 
            hud_right: {
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
                paddingTop: 40
            },
            drawer_opener: {
                color: palette.onSurface.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80px",
                fontWeight: "bold",
                backgroundColor: palette.surfaceContainerLow.main,
                fontSize: "24px"
            },
            table: {
                overflow: "hidden",
                borderRadius: "30px"
            },
            options: {
                paddingLeft: "20px",
                marginBottom: "20px"
            }
        },


        // machine
        machine: {
            root: {
                height: "600px",
                width: "2500px",
                // flexGrow: "1"
                marginBottom: "400px"

            }
        }
    }
}


export default useSyles;