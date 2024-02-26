import React, {FC, SetStateAction } from "react";
import useStyles from "./Styles.tsx";
import {Box, Drawer} from "@mui/material";
import SettingsInputComponentRoundedIcon from "@mui/icons-material/SettingsInputComponentRounded";


type Props = {
    children?: React.ReactNode
    drawerOpen: boolean,
    setDrawerOpen: React.Dispatch<SetStateAction<boolean>>
};
const TDrawer: FC<Props> = ({children, drawerOpen, setDrawerOpen}) => {

    const styles: any = useStyles().drawer;

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }

    const handleDawnerOpen = () => {
        setDrawerOpen(true);
    }

    return <Box>
        <Drawer
            anchor="bottom"
            open={drawerOpen}
            PaperProps={{style: styles.drawer}}
            variant="temporary"
            onClose={handleDrawerToggle}
        >
            {children}
        </Drawer>
        <Box sx={styles.drawer_opener} onMouseOver={handleDawnerOpen}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifySelf: "center",
                alignSelf: "center"
            }}>
                Control panel <SettingsInputComponentRoundedIcon sx={{marginLeft: "10px"}} fontSize="medium"/>
            </Box>
        </Box>
    </Box>
}

export default TDrawer