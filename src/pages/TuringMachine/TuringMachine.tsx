import {FC, useEffect, useState} from "react"
import { Box } from "@mui/material"
import useStyles from "./Styles"
import TDrawer from "./TDrawer.tsx";
import ControlPanel, {TuringConfiguration, TuringOptionsType} from "./ControlPanel.tsx";
import Hud from "./Hud.tsx";


const TuringMachine: FC = () => {

    const styles: any = useStyles().main;
    const [turingOptions, setTuringOptions] = useState<TuringOptionsType>({
        problemA: [],
        customA: [],
        states: [
            {id: 0, name: "begin", configurations: [new TuringConfiguration("lambda")]},
            {id: 1, name: "begin1", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 2, name: "begin2", configurations: [new TuringConfiguration("lambda")]},
            {id: 3, name: "begin3", configurations: [new TuringConfiguration("lambda")]}
        ]
    });

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
            <Hud/>
            <Box>
                {/*<Machine/>*/}
            </Box>
        </Box>
        <TDrawer>
            <ControlPanel turingOptions={turingOptions} setTuringOptions={setTuringOptions}/>
        </TDrawer>
    </Box>
}


export default TuringMachine;