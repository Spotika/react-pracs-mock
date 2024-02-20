import { FC } from "react"
import { Box } from "@mui/material"
import useStyles from "./Styles"
import TDrawer from "./TDrawer"
import Machine from "./Machine"

const TuringMachine: FC = () => {

    const styles: any = useStyles().main;

    return <Box sx={styles.root}>
        <Machine/>
        <TDrawer/>

    </Box>
}


export default TuringMachine;