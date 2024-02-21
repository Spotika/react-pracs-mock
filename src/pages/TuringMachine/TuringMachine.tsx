import { FC, useState } from "react"
import { Box } from "@mui/material"
import useStyles from "./Styles"
import TDrawer from "./TDrawer"
import Machine from "./Machine"
import SpeedIcon from '@mui/icons-material/Speed';
import {Slider} from "@mui/material"
import { config } from "./config"

const TuringMachine: FC = () => {

    const styles: any = useStyles().main;
    const [duration, setDuration] = useState(1);

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
            justifyContent: "space-between"
        }}>
            <Box sx={styles.hud}>
                <Box sx={styles.slider_block}>
                    <SpeedIcon fontSize={"large"}/>
                    <Slider sx={styles.slider} min={0} max={2} step={0.1} aria-label="Volume" value={duration} onChange={handleChange} valueLabelDisplay="on"/>            
                </Box>
            </Box>
            <Machine/>
        </Box>
        <TDrawer/>
    </Box>
}


export default TuringMachine;