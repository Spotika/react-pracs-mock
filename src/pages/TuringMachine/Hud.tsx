import {Box, IconButton, Slider, Typography} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import useStyles from "./Styles.tsx";
import {useState} from "react";


const Hud = () => {

    const styles = useStyles().hud;
    const [action, setAction] = useState(false);

    const handleActionChange = () => {
        setAction(!action);
    }

    return <Box sx={styles.root}>
        <Box sx={styles.left}>
            <Typography fontWeight="bold" variant="h6">
                Current state:
            </Typography>
        </Box>
        <Box sx={styles.right}>
            <Box sx={styles.slider_block}>
                <SpeedIcon fontSize={"medium"}/>
                <Slider
                    sx={styles.slider}
                    min={0}
                    max={2}
                    step={0.1}
                    aria-label="Small"
                    size="small"
                    // value={duration}
                    // onChange={handleChange}
                    valueLabelDisplay="auto"/>
            </Box>
            <Box sx={styles.play_control}>
                <IconButton disabled={action} size="large" color={"primary"}>
                    <SkipPreviousRoundedIcon fontSize="medium"/>
                </IconButton>
                {action ?
                    <IconButton onClick={handleActionChange} color={"primary"}>
                        <PauseRoundedIcon fontSize="medium"/>
                    </IconButton>
                    :
                    <IconButton onClick={handleActionChange} color={"primary"}>
                        <PlayArrowRoundedIcon fontSize="medium"/>
                    </IconButton>
                }
                <IconButton disabled={action} color={"primary"}>
                    <SkipNextRoundedIcon fontSize="medium"/>
                </IconButton>
            </Box>
        </Box>
    </Box>
}

export default Hud;