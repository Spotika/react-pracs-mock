import {FC, useEffect, useRef, useState} from "react"
import { Box, Button } from "@mui/material"
import useStyles from "./Styles"
import TDrawer from "./TDrawer.tsx";
import ControlPanel, {TuringConfiguration, TuringOptionsType} from "./ControlPanel.tsx";
import Hud from "./Hud.tsx";
import Machine, {ActionType, LineType} from "./Machine.tsx";


const TuringMachine: FC = () => {

    const styles: any = useStyles().main;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [turingOptions, setTuringOptions] = useState<TuringOptionsType>({
        problemA: [],
        customA: [],
        states: [
            {id: 0, name: "begin", configurations: [new TuringConfiguration("lambda")]},
        ]
    });
    const [currentStateId, setCurrentStateId] = useState(0);
    const [line, setLine] = useState<LineType>({});
    const [duration, setDuration] = useState<number>(2);
    const [currentAction, setCurrentAction] = useState<ActionType>(
        "render"
    );


    useEffect(() => {

    }, [turingOptions]);

    return <Box sx={styles.root}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Hud
                currentStateName={turingOptions.states.find(e => e.id == currentStateId)?.name || ""}
                duration={duration}
                setDuration={setDuration}
            />
            <Machine
                currentStateId={currentStateId}
                line={line}
                turingOptions={turingOptions}
                duration={duration}
                currentAction={currentAction}
                setCurrentAction={setCurrentAction}
            />
        </Box>
        <TDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
            <ControlPanel isDrawerOpen={drawerOpen} turingOptions={turingOptions} setTuringOptions={setTuringOptions}/>
        </TDrawer>
    </Box>
}


export default TuringMachine;