import { FC, useState } from "react"
import { Box, Button, IconButton, Typography } from "@mui/material"
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


    const handleChange = (event: Event, newValue: number | number[]) => {
        setDuration(newValue as number);
        config.duration = newValue as number;
        console.log(config.duration);
    };

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
                        <Slider sx={styles.slider} min={0} max={2} step={0.1} aria-label="Volume" value={duration} onChange={handleChange} valueLabelDisplay="auto"/>            
                    </Box>
                    <Box sx={styles.play_control}>
                        <IconButton size="large">
                            <SkipPreviousRoundedIcon fontSize="large"/>
                        </IconButton>
                        <IconButton>
                            <PlayArrowRoundedIcon/>
                        </IconButton>
                        <IconButton>
                            <PauseRoundedIcon/>
                        </IconButton>
                        <IconButton>
                            <SkipNextRoundedIcon/>
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