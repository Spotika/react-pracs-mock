import { FC, useState } from "react"
import { Box, IconButton, Typography } from "@mui/material"
import useStyles from "./Styles"
import TDrawer from "./TDrawer"
import Machine from "./Machine"
import SpeedIcon from '@mui/icons-material/Speed';
import {Slider} from "@mui/material"
import { config } from "./config"
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';


const TuringMachine: FC = () => {

    const styles: any = useStyles().main;
    const [duration, setDuration] = useState(config.duration);
    const [action, setAction] = useState(false);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        setDuration(newValue as number);
        config.duration = newValue as number;
        console.log(config.duration);
    };

    const handleActionChange = () => {
        setAction(!action);
    }

    return <Box sx={styles.root}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Box sx={styles.hud}>
                <Box sx={styles.hud_left}>
                    <Typography fontWeight="bold" variant="h4">
                        Current state: 
                    </Typography>
                </Box>
                <Box sx={styles.hud_right}>
                    <Box sx={styles.slider_block}>
                        <SpeedIcon fontSize={"large"}/>
                        <Slider
                            sx={styles.slider}
                            min={0}
                            max={2}
                            step={0.1}
                            aria-label="Volume"
                            value={duration}
                            onChange={handleChange}
                            valueLabelDisplay="auto"/>
                    </Box>
                    <Box sx={styles.play_control}>
                        <IconButton disabled={action} size="large" color={"primary"}>
                            <SkipPreviousRoundedIcon fontSize="large"/>
                        </IconButton>
                        {action ?
                            <IconButton onClick={handleActionChange} color={"primary"}>
                                <PauseRoundedIcon fontSize="large"/>
                            </IconButton>
                            :
                            <IconButton onClick={handleActionChange} color={"primary"}>
                                <PlayArrowRoundedIcon fontSize="large"/>
                            </IconButton>
                        }
                        <IconButton disabled={action} color={"primary"}>
                            <SkipNextRoundedIcon fontSize="large"/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Machine/>
            </Box>
        </Box>
        <TDrawer/>
    </Box>
}


export default TuringMachine;